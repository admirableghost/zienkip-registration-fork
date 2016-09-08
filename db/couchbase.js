//http://query.pub.couchbase.com/tutorial/#index

var console     = require('console');
var couchbase   = require('couchbase');
var n1ql        = require('couchbase').N1qlQuery;
var uuid        = require('uuid');
var q           = require('q');

var config  = require('../config');
var utils   = require('../modules/utils/utils');
var logger  = require('../modules/utils/logger');

function Database() {};
var buckets = {};
 
module.exports = Database;

//connects to the cluster and opens necessary buckets
Database.start = function () {
    console.log("connecting to couch db"); 
    
    var couchCluster    = new couchbase.Cluster(config.couchbase.server);
    
    buckets.profiles                = couchCluster.openBucket(config.couchbase.buckets.profiles);
    buckets.global_static           = couchCluster.openBucket(config.couchbase.buckets.global_static);
    buckets.relational_transactions = couchCluster.openBucket(config.couchbase.buckets.relational_transactions);
    
    for (bucket in buckets) {
        console.log("opened bucket - " + buckets[bucket]._name);
        buckets[bucket].operationTimeout = 120 * 1000;
    }
    console.log("connected to couch db"); 
};

//generic N1ql query
Database.query = function(bucket, query_string, params) {
    
    var defer = q.defer();
    var query = n1ql.fromString(query_string);
    
    buckets[bucket].query(query, params, defer.makeNodeResolver());
    
    return defer.promise;
};

//generic insert
Database.insert = function(bucket, key, value, callback) {
    if(!key) {
        key = uuid.v4();   
    }
    buckets[bucket].insert(key, value, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

//delete a record from given bucket and key
Database.remove = function(bucket, key, callback) {
    
    buckets[bucket].remove(key, function(err,result){
        if (err) {
           callback(err, null);
            return;
        }
        callback(null, {message: "success", key: key});
    });
    
};

// gets a record
Database.get = function (bucket, documentId, callback) {
    buckets[bucket].get(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

// gets multiple records
Database.getMulti = function(bucket, documentIdArray, callback) {
    buckets[bucket].getMulti(documentIdArray, function(error, result) {
        if(error) {
            callback(error, result);
            return;
        }
        callback(null, result);
    });
};

// inserts if key doesnt exist else overwrites
Database.upsert = function(bucket, documentId, value, callback) {
    buckets[bucket].upsert(documentId, value, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

// inserts multiple documents at once
Database.bulkUpsertTransaction = function(bucket, documentJson, callback) {
    
    console.log('inserting ' + JSON.stringify(documentJson));
    
    var documentIdArray = [];
    var documentBackUp;
    
    for( var documentId in documentJson) {
        documentIdArray.push(documentId);
    }
    
    if(!utils.isEmpty(documentIdArray)) {
    
        Database.getMulti(bucket, documentIdArray, function (error, result) {
        
            if (result){
                console.log(JSON.stringify(result));
                for(var key in result) {
                    if(result[key].error && result[key].error.code == 13) {
                        delete result[key].error;
                    }    
                }
                
                documentBackUp = result;
                
                bulkUpsert(bucket, documentJson, result, documentBackUp, function (error, result) {
                    callback(error, result);
                });
            }
        });
    }
        
};

var bulkUpsert = function(bucket, documentJson, existingDoc, documentBackUp, callback) {
            
            // iterate over the document and update the result set
            for( var documentKey in existingDoc) {
                // set all the attribs of the 
                var document    = documentJson[documentKey];
                var resultDoc   = existingDoc[documentKey].value;
                
                if(resultDoc) {
                    for (var attrib in document) {
                        resultDoc[attrib] =  document[attrib];   
                    }
                    documentJson[documentKey] = resultDoc;
                }
            }
            
            // upsert all the records now
            bulkUpsertTransactionWorker(bucket, documentJson, {}, {}, function (error, result) {
        
                if(error) {
                    // delete all the records which are already inserted in the transaction
                    for(var key in result && !documentBackUp[key]) {
                        Database.remove(bucket, key, function (error, result) {
                            if(error) {
                                console.log('bulk insert roll back removal failed : ' + error );
                            }
                        });
                    }
                    for(var key in documentBackUp) {
                        Database.upsert(bucket, key, documentBackUp[key], function (error, result) {
                            if(error) {
                                console.log('bulk insert roll back removal failed : ' + error );
                            }
                        });
                    }
                }
        
                callback(error, result);
            });
            
            
        
}

var bulkUpsertTransactionWorker = function(bucket, documentJson, resultObj, errorObj, callback) {
    
    for (var key in documentJson) {
        Database.upsert(bucket, key, documentJson[key], function (error, result) {
            if(error) {
                    console.log('bulk insert failed for key : ' + key + ' in '+ JSON.stringify(documentJson) );
                    return callback(errorObj, resultObj);
                
            } else {
                resultObj[key] = result;    // stacks the results of all the inserts
                delete documentJson[key];   // removes the successful insert
                
                if(utils.isEmpty(documentJson)) {
                    // when all docs inserted send the final success callback
                    return callback(null, resultObj);
                
                } else {
                    // recursion to insert the remaining docs
                    bulkUpsertTransactionWorker(bucket, documentJson, resultObj, errorObj, callback);     
                }
            }
        });
        break;
    }

}
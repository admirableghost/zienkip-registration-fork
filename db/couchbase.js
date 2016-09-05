//http://query.pub.couchbase.com/tutorial/#index

var console     = require('console');
var couchbase   = require('couchbase');
var n1ql        = require('couchbase').N1qlQuery;
var uuid        = require('uuid');
var q           = require('q');

var config  = require('../config');
var utils   = require('../utils/utils');

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

// inserts multiple documents at once
Database.bulkInsertTransaction = function(bucket, documentJson, callback) {
    
    console.log('inserting ' + JSON.stringify(documentJson));
    
    bulkInsertTransactionWorker(bucket, documentJson, {}, {}, function (error, result) {
        
        if(error) {
            // delete all the records which are already inserted in the transaction
            for(var key in result) {
                Database.remove(bucket, key, function (error, result) {
                    if(error) {
                        console.log('bulk insert roll back removal failed : ' + error );
                    }
                });
            }
        }
        
        callback(error, result);
    });
        
};

var bulkInsertTransactionWorker = function(bucket, documentJson, resultObj, errorObj, callback) {
    
    for (var key in documentJson) {
        Database.insert(bucket, key, documentJson[key], function (error, result) {
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
                    bulkInsertTransactionWorker(bucket, documentJson, resultObj, errorObj, callback);     
                }
            }
        });
        break;
    }

}

Database.get = function (bucket, documentId, callback) {
    buckets[bucket].get(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

Database.getMulti = function(bucket, documentIdArray, callback) {
    buckets[bucket].getMulti(documentIdArray, function(error, result) {
        if(error) {
            callback(error, {message: "failure", data: result});
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

//-----------------------

Database.upsert = function(bucket, jsonData, callback) {
    var documentId = jsonData.id;
    if(documentId) {
        upsert(bucket, documentId, jsonData, callback);
    } else {
        buckets[bucket].counter(jsonData.type, 1, {initial:1}, function(err, res) {
        if (err) {
            callback(err, null);
            return;
        }
        documentId = jsonData.type+'_'+res.value;
        jsonData.id = documentId;
        upsert(bucket, documentId, jsonData, function(error, result) {
            if(error) {
                callback(error, null);
                return;
            }
            callback(null, {message: "success", data: result});
            });
        });
    }
};

var upsert = function(bucket, documentId, value, callback) {
    buckets[bucket].upsert(documentId, value, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};
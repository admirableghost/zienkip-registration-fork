var app = angular.module('kipenzi-login', ['satellizer']);

    app.config(['$httpProvider','$authProvider', function($httpProvider,$authProvider) {
        $httpProvider.interceptors.push('sessionInjector');
           $authProvider.storageType = 'sessionStorage';

        $authProvider.facebook({
            name: 'facebook',
            url: window.location.origin + '/',
            authorizationEndpoint: 'https://www.facebook.com/v2.0/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.5',
            responseType: 'token',
            clientId: '1751077018512546',
            popupOptions: {
                width: 580,
                height: 400
            }
        });
    }])

    app.controller('loginController', function($scope, $http, $window, userService,$auth) {



        $scope.authFlow = function() {
            alert("Auth Flow in Clickedaa..!!");
            $http({
                method: "POST",
                url: "http://localhost:8765" + "/api/getUserName",
                data: {
                    username: $scope.username,
                    password: $scope.password
                     
                }

            }).then(function(response) {
                alert("Auth" + response.data);
            }, function(response) {
                console.log("Error message");
            });

        }
        
        
        $scope.facebookauth = function(provider) {

            $auth.authenticate(provider).then(function(response) {
                 $http({
                method: "POST",
                url: "http://localhost:8765" + "/authenticate",
                data: {
                    username: $scope.username,
                    password: $scope.password,
                    facebooktoken: response.access_token
                     
                }

            }).then(function(response) {
                alert("Auth" + response.data);
                var payload = response.data.token.split(".");
                userService.token = response.data.token;
                alert($window.atob(payload[1]))
     
            }, function(response) {
                console.log("Error message");
            });
                
                displayData($http, response.access_token)
                alert('Success Facebook token' + response.access_token);
                
                
                
                
            });
        };

        
   
        function displayData($http, access_token) {

            $http.get("https://graph.facebook.com/v2.2/me", {
                params: {
                    access_token: access_token,
                    fields: "name,gender,email,location,picture",
                    format: "json"
                }
            }).then(function(result) {
                var name = result.data.name;
                var gender = result.data.gender;
                var picture = result.data.picture;
                alert(result.data.email)
                alert("name " + result.access_token)
                var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
                html = html + "<tr><td>" + "Name" + "</td><td>" + name + "</td></tr>";
                html = html + "<tr><td>" + "Gender" + "</td><td>" + gender + "</td></tr>";
                html = html + "<tr><td>" + "Picture" + "</td><td><img src='" + picture.data.url + "' /></td></tr>";

                html = html + "</tbody></table>";
                // alert(html);
                document.getElementById("listTable").innerHTML = html;
                // $.mobile.changePage($("#profile"), "slide", true, true);
            }, function(error) {
                alert("Error: " + error);
            });
        }
        
        
        
         $scope.logOut = function() {
            alert("Logging Out!");
           
         userService.token="";
        }

    });
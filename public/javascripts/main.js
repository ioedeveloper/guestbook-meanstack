/**
 * @ioedeveloper
 */

var app = angular.module('myApp', []);
        
app.controller('formController', function ($scope, $http) {

    var formData = [];

    var api = {
        getRecord: function () {
            $http.get('/api/guests').then(function (data) {
                $scope.userrecord = data.data;
            }, function (error) {
                console.log(error);
                return false;
            });
        },
        setRecord: function (formData) {
            $http.post('/api/guests', formData).then(function (data) {
                return true;
            }, function (error) {
                console.log(error);
                return false;
            });
        },
        deleteRecord: function (id) {
            $http.delete('/api/guests/'+id).then(function (data) {
                return true;
            }, function(error){
                console.log(error);
                return false;
            });
        },
       updateRecord: function(id,resource,value){
           $http.put('/api/guests/'+resource+'/'+id, formData).then(function(data){
               return true;
           }, function(error){
               console.log(error);
               return false;
           });
    }
}

    api.getRecord();

    //push values into array and save in mongodb
    $scope.add = function () {
        formData = {
            'fullname': $scope.txtfullname,
            'emailaddress': $scope.txtemailaddress,
            'phonenumber': $scope.txtphonenumber,
            'homeaddress': $scope.txthomeaddress,
            'socialmediaaddress': $scope.txtsocialmediaaddress
        };
        api.setRecord(formData);
        api.getRecord();
        console.log("Record created successfully!");
    };

       //delete record using id of object in database
    $scope.delete = function (email, id) {
        api.deleteRecord(id);
        api.getRecord();
        $scope.deleteMsg = "You have deleted "+ email +" successfully!";
    };
            //make container editable (html5)
            $scope.edit = function (event) {
                event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
            };

            //update record using index
            $scope.update = function (resource, id, event) {
                if (event.which == 13) {
                    $scope.edit(event);
                    editeddata = event.target.innerText;
                    formData = {
                    'value':editeddata
                    }
		    api.updateRecord(id,resource,formData);
                    //$scope.userrecord[index][resource] = editeddata;
                    //localStorageService.set("userrecord", $scope.userrecord);
                    console.log("Updated successfully!");
                }
            };

    });
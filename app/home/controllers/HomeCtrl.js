// 'use strict';

var app = angular.module('app.home');

app.controller("timeDataController", ["$scope", "$firebaseObject",
    function($scope, $firebaseObject) {
       
        var ref = firebase.database().ref();

        var varText = ref.child('varText');
       
        varText.on("value", function(snapshot) {
           
            var varText = snapshot.val();
            $scope.showerTests = varText.tesla;
            $scope.testLocation = varText.tesla;

        });


    }
]);

app.controller("HomeController", ["$scope", "$firebaseObject", "$timeout",
    function($scope, $firebaseObject, $timeout) {
       
                 $timeout( function(){
                   
                     $scope.light = 'off';
                   
                
                }, 1000 );


        var dateTimeShowerTest = moment().format("YYYY-MM-DD:HH:MM:sss");
        var ref = firebase.database().ref();
        var obj = $firebaseObject(ref);

        var datatoIOT = ref.child('hawsiot');
         datatoIOT.on("value", function(snapshot) {
             console.log(snapshot.val());
                $timeout( function(){
                   
                     $scope.light = 'on';
                   
                
                }, 1000 );

             $scope.test = snapshot.val();
            
         });
       
        // var varText = ref.child('varText/tesla').path;



        ref.on('child_added', snapshot => {
            console.log('test');
            // console.log(ref.child('hawsiot/data'));
            // $scope.test = obj;
            
       });


       

        // console.log(test);


            obj.$loaded().then(function() {
                // console.log("loaded record:", obj.$id, obj);

               // To iterate the key/value pairs of the object, use angular.forEach()
               angular.forEach(obj, function(value, key) {
                    if(key == 'syncData'){
                        $scope.light = value.Shower;
                    }
               });
             });
        // console.log(firebaseObj);

        $scope.turnOn = function() {
            var showerLoc = ref.child('syncData');
            var varText = ref.child('varText/tesla').path;
            showerLoc.set({
                Shower: 'on'
                
            });
           
            $scope.light = 'on';
        };

        $scope.turnOff = function() {
            var showerLoc = ref.child('syncData');
            showerLoc.set({
                Shower: 'off'
                
            });
            $scope.light = 'off';
        };
          
    }
]);
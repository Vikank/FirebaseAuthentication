var app = angular.module("sampleApp", ["firebase"]);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0aZXTdrJDvAOklyutVEceR7RsTXdBdqs",
  authDomain: "fir-auth-90317.firebaseapp.com",
  databaseURL: "https://fir-auth-90317.firebaseio.com",
  projectId: "fir-auth-90317",
  storageBucket: "fir-auth-90317.appspot.com",
  messagingSenderId: "750972801741",
  appId: "1:750972801741:web:eb37773565303aa5af8f84",
  measurementId: "G-J1EW61NB4C",
};
firebase.initializeApp(firebaseConfig);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", [
  "$firebaseAuth",
  function ($firebaseAuth) {
    return $firebaseAuth();
  },
]);

// and use it in our controller
app.controller("SampleCtrl", [
  "$scope",
  "Auth",
  function ($scope, Auth) {
    
/*                                                            Manually                                                                  */
    $scope.createUser = function () {
      $scope.message = null;
      $scope.error = null;
      
      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function (firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        })
        .catch(function (error) {
          $scope.error = error;
        });
    };

    $scope.deleteUser = function () {
      $scope.message = null;
      $scope.error = null;

      // Delete the currently signed-in user
      Auth.$deleteUser()
        .then(function () {
          $scope.message = "User deleted";
        })
        .catch(function (error) {
          $scope.error = error;
        });
    };

/*                                                            Manually                                                                  */

/*                                                            Facebook                                                                  */
    $scope.facebookLogin = function () {
      console.log("done");
      Auth.$signInWithPopup("facebook");
    };
/*                                                            Facebook                                                                  */

/*                                                            Google                                                                  */
    $scope.googleLogin = function () {
      console.log("done");
      Auth.$signInWithPopup("google");
    };
/*                                                            Google                                                                  */

/*                                                            Logout                                                                  */
    $scope.Logout = function () {
      Auth.$signOut();
      window.location.href = "index.html";
    };
/*                                                            Logout                                                                  */

/*                                                            Redirect to success page                                                                  */
// any time auth state changes, add the user data to scope
    Auth.$onAuthStateChanged(function (firebaseUser) {
        if(firebaseUser!=null && window.location.pathname !== '/success.html') {
                window.location.href = 'success.html'
        }
        
      $scope.firebaseUser = firebaseUser;
    });

/*                                                            Redirect to success page                                                                  */

  }
]);

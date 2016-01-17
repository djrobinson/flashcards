//initialize main module

angular.module('flashcards', ['ui.tinymce','ngSanitize'])
  .controller('cardController', function($scope, $sce, Cards){
      $scope.formData = {};
      $scope.tinymceoptions = {
        selector: "textarea",  // change this value according to your HTML
        plugins: "link"
      }

    Cards.get()
      .success(function(data){
        $scope.cards = data;
        $scope.cards.answer = $sce.trustAsHtml(data.answer);
      })

    $scope.createCard = function() {
      if(!$.isEmptyObject($scope.formData.question)) {

        Cards.create($scope.formData)
          .success(function(data){
            $scope.formData = {};
            $scope.cards = data;
          })

      }
    }

    //create retrieval of a random card from the db, go off id, get count first, elimnate used ids (somehow?)
    //$scope.randomCard = function(category) {

      //}
  })

  .factory('Cards', function($http) {
    return {
        get : function() {
            return $http.get('/api/cards');
        },
        create : function(cardData) {
            return $http.post('/api/cards', cardData);
        }
    }
  })


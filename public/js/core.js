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

  $scope.deleteCard = function(id) {
    Cards.delete(id)
        // if successful creation, call our get function to get all the new todos
        .success(function(data) {
            $scope.cards = data; // assign our new list of todos
        });
      };
    })

  .factory('Cards', function($http) {
    return {
      get : function() {
          return $http.get('/api/cards');
      },
      create : function(cardData) {
          return $http.post('/api/cards', cardData);
      },
      delete : function(id) {
          return $http.delete('/api/cards/' + id);
      }
    }
  })


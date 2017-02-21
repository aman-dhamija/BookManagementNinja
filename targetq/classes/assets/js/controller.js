var mainApp = angular.module("mainApp").controller('MyController', function ($scope,$http,myservice) {

        $scope.BookModel = myservice.BookModel;
        $scope.BookList = myservice.BookList;
        var url = "http://localhost:8080/showAllBooks";
        $http.get(url).success( function(response) {
           $scope.b = response;
		   var x=$scope.b;
		for (var i = 0; i < x.length; i++) {
			var Book = {
					id: $scope.b[i].id,
					name: $scope.b[i].name,  
					price: $scope.b[i].price,
					author: $scope.b[i].author,
					
			}
			$scope.BookList.push(Book);
		}
		   
        });
        
        $scope.AddData = function () {  
     	var error=0;
					
                 if(error==0){					
                var m = {   
                	id: $scope.Id1,
                    name: $scope.Name1,
                    author: $scope.Author1,
                    price: $scope.Price1,
				   
                }; 
                
                $.ajax({
                	type : "POST",
        			url : "/addBook",
        			data : JSON.stringify(m),
        			contentType : "application/json; charset=utf-8",
        			dataType : "json",
        			success : function(msg) {
        				
        			},
        			error : function(errormessage) {
        				alert(errormessage.statusText);

        			}
                });
                $scope.BookList.push(m);
                ClearModel();
                 }
                 }				 
             
  
            $scope.DeleteData = function (Book) {  
                var position = $scope.BookList.indexOf(Book);  
                $scope.BookList.splice(position, 1);
                alert(JSON.stringify(Book));
                $.ajax({
                 	type : "POST",
         			url : "/removeBook",
         			data : JSON.stringify(Book),
         			contentType : "application/json; charset=utf-8",
         			dataType : "json",
         			success : function(msg) {
         				
         			},
         			error : function(errormessage) {
         				alert(errormessage.statusText);

         			}
                 }); 	
                 
                 ClearModel();				 
            }  
  
            $scope.BindSelectedData = function (Book) {  
                $scope.BookModel.Id = Book.Id;  
                $scope.BookModel.Name = Book.Name;  
                $scope.BookModel.Price = Book.Price;  
				$scope.BookModel.Author = Book.Author;
            }  
  
            $scope.UpdateData = function () {  
                $.grep($scope.BookList, function (e) {  
                    if (e.Id == $scope.BookModel.Id) {  
                        e.Name = $scope.BookModel.Name;  
                        e.Price = $scope.BookModel.Price;
						e.Author = $scope.BookModel.Author;
                        e.editMode=false;
                        alert(JSON.stringify(m));
                        $.ajax({
                        	type : "POST",
                			url : "/updateBook",
                			data : JSON.stringify(m),
                			contentType : "application/json; charset=utf-8",
                			dataType : "json",
                			success : function(msg) {
                				
                			},
                			error : function(errormessage) {
                				alert(errormessage.statusText);

                			}
                        });
                    }  
                });  
                ClearModel();  
            }  
  
            function ClearModel() {  
                $scope.Id1='';  
                $scope.Name1 = '';  
                $scope.Price1= ''; 
                $scope.Author1 = '';
            }    });




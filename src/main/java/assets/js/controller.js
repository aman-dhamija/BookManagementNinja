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
					author: $scope.b[i].author,
					price: $scope.b[i].price,
					editMode: false
					
					
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
                    price: $scope.Price1
				   
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
                var z = {   
                    	id: $scope.Id1,
                        name: $scope.Name1,
                        author: $scope.Author1,
                        price: $scope.Price1,
                        editMode: false
    				   
                    }; 
                $scope.BookList.push(z);
                ClearModel();
                 }
                 }				 
             
  
            $scope.DeleteData = function (Book) {  
                var position = $scope.BookList.indexOf(Book);  
                $scope.BookList.splice(position, 1);
                var t = {
                		id: Book.id,
                        name: Book.name,
                        author: Book.author,
                        price: Book.price
                }
                $http.post('/removeBook',t).success(function(Data){
                	
                });
            
            
                 
                 ClearModel();				 
            }  
            
            $scope.edit = function (Book){
            	Book.editMode= true; 
            	$scope.editData = {
            			id: Book.id,
            			name: Book.name,
            			author: Book.author,
            			price: Book.price
            	}
            }
            
            $scope.BindSelectedData = function (Book) {  
                $scope.BookModel.Id = Book.Id;  
                $scope.BookModel.Name = Book.Name;  
                $scope.BookModel.Price = Book.Price;  
				$scope.BookModel.Author = Book.Author;
            }  
  
            $scope.updateData = function (Book) {  
                Book.editMode=false; 
                console.log(Book);
                Book.name=$scope.editData.name;
                Book.author=$scope.editData.author;
                Book.price=$scope.editData.price;
                var t = {
                		id: Book.id,
                        name: $scope.editData.name,
                        author: $scope.editData.author,
                        price: $scope.editData.price
                }
                console.log(t);
                $http.post('/updateBook',t).success(function(Data){
                
                });
                ClearModel();  
            }  
  
            function ClearModel() {  
                $scope.Id1='';  
                $scope.Name1 = '';  
                $scope.Price1= ''; 
                $scope.Author1 = '';
            }    });







var mainApp = angular.module("mainApp", []);
mainApp.service('myservice', function () {

    this.BookModel = {  
                Id: '',  
                Price: 0,  
                Name: '', 
                Author: '',
                editMode: false	
				}; 
			
            				 
  
            this.BookList = [];  
			this.total=0;
});


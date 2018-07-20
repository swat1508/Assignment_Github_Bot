
const DomOperations = require('./../view/domOpeartions.js');
const $domOp = new DomOperations();

module.exports = class GitOperations { 

 processFetchApiWithPost(objData){
    debugger;
     var authorizationToken  =  'token a6d7aa4fc5abf1e87224ab0d945087ae93769485';
  
    var statusCode;
    var myArray =  [];
       fetch(objData.url, {
               method: objData.method,
               headers: {
                   "Content-Type": "application/json; charset=utf-8",
                   "Authorization": authorizationToken
               },
               body: JSON.stringify(objData.jsonData)
           }
       )
   
       .then((response) => {
           debugger;
           statusCode = response.status;
           if (response.ok) {
               return response.json();
           } else {
               debugger;                                   
               $domOp.setResponseInWidget(objData.operation,myArray,statusCode);            
           }
       })
       .then((jsonData) => {
           myArray = jsonData;           
           $domOp.setResponseInWidget(objData.operation,myArray,statusCode);
       })
       .catch((err) => {
           debugger;
           console.log("Error:", err.message);
       })   
};

 processFetchApiWithGet(objData){
    debugger;
     var authorizationToken  =  'token a6d7aa4fc5abf1e87224ab0d945087ae93769485';
  
    var statusCode;
    var myArray =  [];
       fetch(objData.url, {
               method: objData.method,
               headers: {
                   "Content-Type": "application/json; charset=utf-8",
                   "Authorization": authorizationToken
               }
              
           }
       )
   
       .then((response) => {
           debugger;
           statusCode = response.status;
           if (response.ok) {
               return response.json();
           } else {
               debugger;            
               $domOp.setResponseInWidget(objData.operation,myArray,statusCode);          
              // throw new Error('No response found');
           }
       })
       .then((jsonData) => {
           myArray = jsonData;
           $domOp.setResponseInWidget(objData.operation,myArray,statusCode);
       })
       .catch((err) => {
           debugger;
           console.log("Error:", err.message);
       })   
}

}

const DomOperations = require('./../view/domOpeartions.js');
const $domOp = new DomOperations();

module.exports = class GitOperations { 

 processFetchApiWithPost(objData){
    debugger;
     var authorizationToken  =  'token 9743e8c3db3090a903c990fdc97de9154e2fdb77';
  
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
     var authorizationToken  =  'token 9743e8c3db3090a903c990fdc97de9154e2fdb77';
  
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
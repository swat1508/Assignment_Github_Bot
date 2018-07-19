//const RequestHandler = require("./requestHandler.js");

import './../scss/mystyles.scss';
import './../css/mystyles.css';

// Connect to recast.ai starts
$('#userTextBox').keyup(function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
        var command = document.getElementById('userTextBox').value;
        var text = { "text": command};
        var url = "https://api.recast.ai/v2/request?text=" + command;
        var bodyRelevant = '';
        var intent = '';
        var intentData = {};
        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Token c98b516eb29bfd162d9f756d5459fca6"
            },
            data: text
        })
        .then(function(response) {
            response.json().then(function(body) {
                debugger;
                bodyRelevant = body.results;
                if(!bodyRelevant.intents[0]){           //Error Check 1
                    alert("Command Not Matched to Reacast");
                    return;
                }

                intent = bodyRelevant.intents[0]["slug"];
                intentData=body.results.entities; //body.results.entities.git_repo[0].value;
                debugger;
                alert("intent is : "  + intent);
                displayModal(intent,intentData);
               // processRequestsForGit(intent,intentData);                
            });
        })
        .catch(function(error) {
            console.error('Fetch Error =\n', error);
        });
    }
 });
//connect t recast.ai ends
function validateDataFromRecast(intent,intentData){
    debugger;
    var tb= intent + "-repoName";
    if(intentData.git_repo){
       
        document.getElementById(tb).value= intentData.git_repo[0].value;    
    }else{
        document.getElementById(tb).value= "";
    }

    if( (intent == "close-issue") || (intent== "add-collaborator") ){
        var tb= intent + "-target";
            if(intentData.target){
                document.getElementById(tb).value= intentData.target[0].value;
            }else{
                document.getElementById(tb).value= "";
            }       
    }
}

function displayModal(intent,intentData){
    debugger;
    if(intent=="create-repo"){
        var triggerElement = document.getElementById('showModal');
        triggerElement.setAttribute('data-target', '#'+intent);
        validateDataFromRecast(intent,intentData);         
        triggerElement.click();
    
    } else if(intent=="create-issue"){
        var triggerElement = document.getElementById('showModal');
        triggerElement.setAttribute('data-target', '#'+intent);
        // document.getElementById("createIssueRepoName").value= intentData.git_repo[0].value;
        validateDataFromRecast(intent,intentData);  
        triggerElement.click();
    } else if(intent=="close-issue"){
        var triggerElement = document.getElementById('showModal');
        triggerElement.setAttribute('data-target', '#'+intent);
        // document.getElementById("closeIssueRepoName").value= intentData.git_repo[0].value;
        // document.getElementById("closeIssueNumber").value= intentData.target[0].value; 
        validateDataFromRecast(intent,intentData);  
        triggerElement.click();
    } else if(intent=="add-comment"){
        debugger;
        var triggerElement = document.getElementById('showModal');
        triggerElement.setAttribute('data-target', '#'+intent);
        // document.getElementById("addCommentRepoName").value= intentData.git_repo[0].value;        
        validateDataFromRecast(intent,intentData);  
        triggerElement.click();
    } else if(intent=="add-collaborator"){
        debugger;
        var triggerElement = document.getElementById('showModal');
        triggerElement.setAttribute('data-target', '#'+intent);
        // document.getElementById("addCollaboratorRepoName").value= intentData.git_repo[0].value;     
        // document.getElementById("addCollaboratorUsername").value= intentData.target[0].value; 
        validateDataFromRecast(intent,intentData);  
        triggerElement.click();
    } else if(intent=="view-issues"){
        debugger;
        var repoName= intentData.git_repo[0].value;     
        let url = "https://api.github.com/repos/swat1508/" + repoName + "/issues?state=all";
      //No Json Required For Get Operation        
        var objData={};
        objData.url=url;
        objData.method="GET";
        //objData.jsonData=getIssueJson;
        objData.operation="viewIssues"; 
        processFetchApiWithGet(objData);
    }else if(intent=="view-latest-comment"){
        var repoName= intentData.git_repo[0].value;     
        var issueNumber = intentData.target[0].value;
        let url = "https://api.github.com/repos/swat1508/" + repoName + "/issues/" + issueNumber + "/comments";
        console.log("url",url);
      //No Json Required For Get Operation        
        var objData={};
        objData.url=url;
        objData.method="GET";
        objData.operation="getLatestComment"; 
        processFetchApiWithGet(objData);
    }else{                                                        //Error Check 2
        alert("Entered matched some intent but not GIT command");
        return;
    }            
}

$("#createRepoOk").on('click', function() {  // Ok Button in Create Repo
    debugger; 
    document.getElementById("createRepoClose").click();
    var repoName = document.getElementById("create-repo-repoName").value;
    var repoDesc=document.getElementById("create-repo-repoDesc").value;
    let url = 'https://api.github.com/user/repos';
    var newRepoJson= {
        "name": repoName,
        "description": repoDesc,
        "homepage": "https://github.com",
        "private": false,
        "has_issues": true,
        "has_wiki": true
    }
    var objData={};
    objData.url=url;
    objData.method="POST";
    objData.jsonData=newRepoJson;
    objData.operation="createRepo";
    processFetchApiWithPost(objData);

});

$("#createIssueOk").on('click', function() { // Ok Button in Create Issue
    debugger;
    document.getElementById("createIssueClose").click();

    var repoName = document.getElementById("create-issue-repoName").value;
    var issueTitle=document.getElementById("create-issue-issueTitle").value;
    var issueBody=document.getElementById("create-issue-issueDesc").value;

    
    let url = "https://api.github.com/repos/swat1508/" + repoName + "/issues";
    var newIssueJson= {
        "title": issueTitle,
        "body": issueBody,
        "assignees": [
            "swat1508"
        ],
        "labels": [
            "bug"
        ]
    }
    var objData={};
    objData.url=url;
    objData.method="POST";
    objData.operation="createIssue";
    objData.jsonData=newIssueJson;
    debugger;
    processFetchApiWithPost(objData);
});


$("#closeIssueOk").on('click', function() { // Ok Button in Close Issue
    debugger;
    document.getElementById("closeIssueClose").click();

    var repoName=document.getElementById("close-issue-repoName").value;
    var issueNumber=document.getElementById("close-issue-target").value;

    let url = "https://api.github.com/repos/swat1508/" + repoName + '/issues/' + issueNumber;
    var closeIssueJson= {
        "state":"close"
    }
    var objData={};
    objData.url=url;
    objData.jsonData=closeIssueJson;
    objData.method="PATCH";
    objData.operation="closeIssue";
    processFetchApiWithPost(objData);

});

$("#addCommentOk").on('click', function() { // Ok Button in Add Comment
    debugger;
    document.getElementById("addCommentClose").click();

    var repoName=document.getElementById("add-comment-repoName").value;
    var issueNumber=document.getElementById("add-comment-issueNumber").value;
    var commentBody=document.getElementById("add-comment-commentBody").value;

    let url = "https://api.github.com/repos/swat1508/" + repoName + '/issues/' + issueNumber + "/comments";    
    var addCommentJson= {
        "body": commentBody          
    }
    var objData={};
    objData.url=url;
    objData.jsonData=addCommentJson;
    objData.method="POST";
    objData.operation="addComment";
    processFetchApiWithPost(objData);
});
$("#addCollaboratorOk").on('click', function() { // Ok Button in Add Collaborator
    debugger;
    document.getElementById("addCollaboratorClose").click();
    var repoName=document.getElementById("add-collaborator-repoName").value;
    var collaboratorName=document.getElementById("add-collaborator-target").value;

   let url = 'https://api.github.com/repos/swat1508/' + repoName + '/collaborators/' + collaboratorName;
     var addCollaboratorJson= {
            
    }

   var objData={};
    objData.url=url;
    objData.jsonData=addCollaboratorJson;  // Json needed for Add Collaborator Operation
    objData.method="PUT";
    objData.operation="addCollaborator";
    processFetchApiWithPost(objData);
    }); 

function processFetchApiWithPost(objData){
    debugger;
     var authorizationToken  =  'token 62fa1611c54121f9c44e6f95e08120c7ef04eebf';
  
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
                       // setRepoInWidgetForCreate(objData.operation,myArray,statusCode);            
                          setResponseInWidget(objData.operation,myArray,statusCode);            
              // throw new Error('No response found');
           }
       })
       .then((jsonData) => {
           myArray = jsonData;
           // setRepoInWidgetForCreate(objData.operation,myArray,statusCode);
           setResponseInWidget(objData.operation,myArray,statusCode);
       })
       .catch((err) => {
           debugger;
           console.log("Error:", err.message);
       })   
}

function processFetchApiWithGet(objData){
    debugger;
     var authorizationToken  =  'token 62fa1611c54121f9c44e6f95e08120c7ef04eebf';
  
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
                       setResponseInWidget(objData.operation,myArray,statusCode);          
              // throw new Error('No response found');
           }
       })
       .then((jsonData) => {
           myArray = jsonData;
           setResponseInWidget(objData.operation,myArray,statusCode);
       })
       .catch((err) => {
           debugger;
           console.log("Error:", err.message);
       })   
}

   function setResponseInWidget(operationType,myArray,statusCode){
        debugger;

    alert("setResponseInWidget : " + statusCode);

        if(document.getElementById("command_result")){   
            var parent = document.getElementById('myWidget');
            var child = document.getElementById("command_result");
            parent.removeChild(child);
        }


if(operationType=="createRepo"){
    if(statusCode==201){ 

    var tablearea = document.getElementById('myWidget');
    var table = document.createElement('table');

    table.setAttribute("id","command_result");

//create table data
debugger;
var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoNameTag = document.createTextNode("Repo Name");  //Repo Name
var repoName = document.createTextNode(myArray.name);
td1.appendChild(repoNameTag);
td2.appendChild(repoName);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoDescTag = document.createTextNode("Repo Desc");     ////Repo Desc
var repoDesc = document.createTextNode(myArray.description);
td1.appendChild(repoDescTag);
td2.appendChild(repoDesc);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoIdTag = document.createTextNode("Repo Id");  //Repo Id
var repoId = document.createTextNode(myArray.id);
td1.appendChild(repoIdTag);
td2.appendChild(repoId);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoCloneUrlTag = document.createTextNode("Repo Clone Url"); //Repo Clone URL
var repoCloneUrl = document.createTextNode(myArray.clone_url);
td1.appendChild(repoCloneUrlTag);
td2.appendChild(repoCloneUrl);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoOwnerIdTag = document.createTextNode("Repo Owner Id");  //Repo Owner Id
var repoOwnerId = document.createTextNode(myArray.owner.login);
td1.appendChild(repoOwnerIdTag);
td2.appendChild(repoOwnerId);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var repoOwnerNameTag = document.createTextNode("Repo Owner Login"); //Repo Owner Login
var repoOwnerName = document.createTextNode(myArray.name);
td1.appendChild(repoOwnerNameTag);
td2.appendChild(repoOwnerName);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);
    tablearea.appendChild(table);
} //201 ends
else if(statusCode==422){ 
    var tablearea = document.getElementById('myWidget');
    var table = document.createElement('table');
    table.setAttribute("id","command_result");


    var tr = document.createElement('tr');   
    var td = document.createElement('td');    
    td.style.border="1px solid blue";
    
    var errorMsg = document.createTextNode("Repo with this name already exists");  //error msg
    td.appendChild(errorMsg);
    tr.appendChild(td);
    
    table.appendChild(tr);
    table.style.border="3px solid black"; 
    tablearea.appendChild(table);
}
} //createRepo ends

else if(operationType=="createIssue"){
    if(statusCode==201){ 

        debugger;
    var tablearea = document.getElementById('myWidget');
    var table = document.createElement('table');

    table.setAttribute("id","command_result");

//create table data
debugger;
var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var issueTitleTag = document.createTextNode("Issue Title");  //Issue Title
var issueTitle = document.createTextNode(myArray.title);
td1.appendChild(issueTitleTag);
td2.appendChild(issueTitle);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var issueDescTag = document.createTextNode("Issue Desc");     //Issue Desc
var issueDesc = document.createTextNode(myArray.body);
td1.appendChild(issueDescTag);
td2.appendChild(issueDesc);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var issueUrlTag = document.createTextNode("Issue URL");  //Issue URL
var issueUrl = document.createTextNode(myArray.url);
td1.appendChild(issueUrlTag);
td2.appendChild(issueUrl);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var issueAssigneeTag = document.createTextNode("Issue Assignee"); //Issue Assignee
var issueAssignee = document.createTextNode(myArray.assignee.login);
td1.appendChild(issueAssigneeTag);
td2.appendChild(issueAssignee);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);
table.style.border="3px solid black";
tablearea.appendChild(table);


    }


}

if(operationType=="addComment"){
    if(statusCode==201){
        var tablearea = document.getElementById('myWidget');
        var table = document.createElement('table');
    
        table.setAttribute("id","command_result");
    
    //create table data
    debugger;
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentIdTag = document.createTextNode("Comment ID");  //Comment Id
    var commentId = document.createTextNode(myArray.id);
    td1.appendChild(commentIdTag);
    td2.appendChild(commentId);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentBodyTag = document.createTextNode("Comment Body");     //Commment URL
    var commentBody = document.createTextNode(myArray.body);
    td1.appendChild(commentBodyTag);
    td2.appendChild(commentBody);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentUrlTag = document.createTextNode("Issue URL");     //Commment URL
    var commentUrl = document.createTextNode(myArray.issue_url);
    td1.appendChild(commentUrlTag);
    td2.appendChild(commentUrl);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    table.style.border="3px solid black";
    tablearea.appendChild(table);
    }
}

if(operationType=="closeIssue"){  
    if(statusCode==200){
        var tablearea = document.getElementById('myWidget');
        var table = document.createElement('table');
    
        table.setAttribute("id","command_result");
    
    //create table data
    debugger;
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentNumberTag = document.createTextNode("Issue ID");  //Comment Number
    var commentNumber = document.createTextNode(myArray.number);
    td1.appendChild(commentNumberTag);
    td2.appendChild(commentNumber);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentIdTag = document.createTextNode("Comment Id");     //Commment Id
    var commentId = document.createTextNode(myArray.id);
    td1.appendChild(commentIdTag);
    td2.appendChild(commentId);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentBodyTag = document.createTextNode("Commment Body");     //Commment Body
    var commentBody = document.createTextNode(myArray.body);
    td1.appendChild(commentBodyTag);
    td2.appendChild(commentBody);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentTitleTag = document.createTextNode("Commment Title");     //Commment Title
    var commentTitle = document.createTextNode(myArray.title);
    td1.appendChild(commentTitleTag);
    td2.appendChild(commentTitle);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    var commentStateTag = document.createTextNode("Commment State");     //Commment State
    var commentState = document.createTextNode(myArray.state);
    td1.appendChild(commentStateTag);
    td2.appendChild(commentState);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    table.style.border="3px solid black";

tablearea.appendChild(table);        
    }}

    if(operationType=="addCollaborator"){   
        if(statusCode==201){                             
        debugger;
        
        var tablearea = document.getElementById('myWidget');
        var table = document.createElement('table');    
        table.setAttribute("id","command_result");

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var urlTag = document.createTextNode("URL");                 //URL
var url = document.createTextNode(myArray.html_url);
td1.appendChild(urlTag);
td2.appendChild(url);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var inviterIdTag = document.createTextNode("Inviter Id");     //Inviter Id
var inviterId = document.createTextNode(myArray.inviter.id);
td1.appendChild(inviterIdTag);
td2.appendChild(inviterId);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var inviterLoginTag = document.createTextNode("Inviter Login");    //Inviter Login
var inviterLogin = document.createTextNode(myArray.inviter.login);
td1.appendChild(inviterLoginTag);
td2.appendChild(inviterLogin);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var inviteeIdTag = document.createTextNode("Invitee ID");   //Invitee ID
var inviteeId = document.createTextNode(myArray.invitee.id);
td1.appendChild(inviteeIdTag);
td2.appendChild(inviteeId);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var inviteeLoginTag = document.createTextNode("Invitee Login");     //Invitee Login
var inviteeLogin = document.createTextNode(myArray.invitee.login);
td1.appendChild(inviteeLoginTag);
td2.appendChild(inviteeLogin);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);
table.style.border="3px solid black";
tablearea.appendChild(table); 
        }}

        else if(operationType=="viewIssues"){   //View Issues
            debugger;
            var tablearea = document.getElementById('myWidget');
            var table = document.createElement('table');    

            table.setAttribute("id","command_result");
      var tr = document.createElement('tr');   
      tr.style.border="1px solid green";
      var td  = document.createElement('td');
      var td0 = document.createElement('td');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');
      
      td.style.border ="1px solid blue";
      td0.style.border="1px solid blue";
      td1.style.border="1px solid blue";
      td2.style.border="1px solid blue";
      td3.style.border="1px solid blue";
      td4.style.border="1px solid blue";
      td5.style.border="1px solid blue";
      
      var text  = document.createTextNode('Issue Number');
      var text0 = document.createTextNode('Issue ID');
      var text1 = document.createTextNode('Issue Body');
      var text2 = document.createTextNode('Issue Title');
      var text3 = document.createTextNode('Issue State');
      var text4 = document.createTextNode('Assignee Id');
      var text5 = document.createTextNode('Assignee Name');
      
      td.appendChild(text);
      td0.appendChild(text0);
      td1.appendChild(text1);
      td2.appendChild(text2);
      td3.appendChild(text3);
      td4.appendChild(text4);
      td5.appendChild(text5);
  
      tr.appendChild(td);
      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
  
      table.appendChild(tr);
      
      //create table data
      debugger;
      for (var i = 0; i < myArray.length; i++){
          var tr = document.createElement('tr');   
          tr.style.border="1px solid green";
          var td  = document.createElement('td');
          var td0 = document.createElement('td');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var td5 = document.createElement('td');
      
      
           td.style.border="1px solid blue";
          td0.style.border="1px solid blue";
          td1.style.border="1px solid blue";
          td2.style.border="1px solid blue";
          td3.style.border="1px solid blue";
          td4.style.border="1px solid blue";
          td5.style.border="1px solid blue";
  
      debugger;
          var text  = document.createTextNode(myArray[i].number);
          var text0 = document.createTextNode(myArray[i].id);
          var text1 = document.createTextNode(myArray[i].body);
          var text2 = document.createTextNode(myArray[i].title);
          var text3 = document.createTextNode(myArray[i].state);
  
          var text4 = document.createTextNode("NA");
          if(myArray[i].assignee){
              text4=document.createTextNode(myArray[i].assignee.id);
          }
          var text5 = document.createTextNode("NA");
          if(myArray[i].assignee){
          text5=document.createTextNode(myArray[i].assignee.login);
          }            
      
          td.appendChild(text);
          td0.appendChild(text0);
          td1.appendChild(text1);
          td2.appendChild(text2);
          td3.appendChild(text3);
          td4.appendChild(text4);
          td5.appendChild(text5); 
  
         
          tr.appendChild(td);
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
      
          table.appendChild(tr);
      }
      table.style.border="3px solid black";
     
      tablearea.appendChild(table);


        }
        else if(operationType=="getLatestComment"){
        alert("Get Latest Comment");
        debugger;
        
        myArray.forEach(function(element) {
            var utcDate=element.updated_at;
            var localDate = new Date(utcDate);
            console.log(localDate);
              });

              
//Finding the last updated comment and storing in array lastComment              
var lastComment=[];
lastComment = myArray[0];
for(var i=1;i<myArray.length;i++){    
        if(myArray[i].updated_at > lastComment.updated_at){
            lastComment = myArray[i];
        }
}
console.log("Last Updated Comment : ", lastComment.body);

var tablearea = document.getElementById('myWidget');
var table = document.createElement('table');    
table.setAttribute("id","command_result");

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var idTag = document.createTextNode("URL");                 //Id
var idValue = document.createTextNode(lastComment.id);
td1.appendChild(idTag);
td2.appendChild(idValue);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var bodyTag = document.createTextNode("Inviter Id");     //Body
var bodyValue = document.createTextNode(lastComment.body);
td1.appendChild(bodyTag);
td2.appendChild(bodyValue);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var urlTag = document.createTextNode("URL");                 //URL
var urlValue = document.createTextNode(lastComment.html_url);
td1.appendChild(urlTag);
td2.appendChild(urlValue);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var lastUpdatedInUTCFormat=lastComment.updated_at;
var lastUpdatedInISTFormat = new Date(lastUpdatedInUTCFormat);

var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
var updatedTag = document.createTextNode("Inviter Id");     //Body
var updatedValue = document.createTextNode(lastUpdatedInISTFormat);
td1.appendChild(updatedTag);
td2.appendChild(updatedValue);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

table.style.border="3px solid black";
tablearea.appendChild(table);
        }

}


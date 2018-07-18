//const RequestHandler = require("./requestHandler.js");



// document.write('<h1>' + requestHandler.processRequestsForGit() + '</h1>')
processRequestsForGit=function(){
    var myArray =  [];
    var myData = document.getElementById("userTextBox").value;
    
    //Extract Request Here  
    if(myData == ""){
        alert("Type Some Command");
    } 
    else{
  //      var createIndex = myData.search("get");
    if (myData.search("get repo") != -1) {    // Get Repo Starts
        alert("get repo");

     
        const uri = 'https://api.github.com/user/repos';
        let token = 'token 178afe758be202b9d4edd25be5893f8bb6934209';

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'token 178afe758be202b9d4edd25be5893f8bb6934209');
        let req = new Request(uri, {
            method: 'GET',
            headers: h,
            mode: 'cors'
        });

        fetch(req)
            .then((response) => {
                statusCode = response.status;
                if (response.ok) {
                    return response.json();
                } else {
                    debugger;
                    setResponseInWidgetForView("viewRepo",myArray,statusCode);
                    throw new Error('No response found');
                }
            })
            .then((jsonData) => {
                myArray = jsonData;
                debugger;
                setRepoInWidsetResponseInWidgetForView("viewRepo",myArray,statusCode);
            })
            .catch((err) => {
                debugger;
                setResponseInWidgetForView("viewRepo",myArray,statusCode);
                console.log("Error:", err.message);
            })

    } //get repo ends here

else if (myData.search("get issue") != -1) {     // Get Issue
    alert("get issue");
   
    //const uri = 'https://api.github.com/user/repos';
    let uri = 'https://api.github.com/repos/swat1508/repository-111/issues';
    let token = 'token 178afe758be202b9d4edd25be5893f8bb6934209';

    let h = new Headers();
    h.append('Content-Type', 'application/json');
    h.append('Authorization', 'token 178afe758be202b9d4edd25be5893f8bb6934209');
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
        mode: 'cors'
    });

    fetch(req)
        .then((response) => {
            statusCode = response.status;
            if (response.ok) {
                debugger;
                return response.json();
            } else {
                debugger;
                setResponseInWidgetForView("viewIssue",myArray,statusCode);
                throw new Error('No response found');
            }
        })
        .then((jsonData) => {
            myArray = jsonData;
            debugger;
            setResponseInWidgetForView("viewIssue",myArray,statusCode);
        })
        .catch((err) => {
            debugger;
            setResponseInWidgetForView("viewIssue",myArray,statusCode);
            console.log("Error:", err.message);
        })

} //get issue ends here

   else if(myData.search("create repo") != -1){      //create repo starts
       alert("create repo");
       
var statusCode;
    var newRepoJson= {
        "name": "repository 555",
        "description": "New Repo 555",
        "homepage": "https://github.com",
        "private": false,
        "has_issues": true,
        "has_wiki": true
    }

    var authorizationToken  =  'token  032dfa552e8662076ae3c61866629bd0be6a5a0c';
    let url = 'https://api.github.com/user/repos';
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authorizationToken
            },
            body: JSON.stringify(newRepoJson)
        }
    )

    .then((response) => {
        debugger;
        statusCode = response.status;
        if (response.ok) {
            return response.json();
        } else {
            debugger;            
                    setRepoInWidgetForCreate("createRepo",myArray,statusCode);            
           // throw new Error('No response found');
        }
    })
    .then((jsonData) => {
        myArray = jsonData;
        setRepoInWidgetForCreate("createRepo",myArray,statusCode);
    })
    .catch((err) => {
        debugger;
        console.log("Error:", err.message);
    })

    } //create repo ends

    else if(myData.search("create issue") != -1){  //create issue starts

    alert("create issue");
    var statusCode;
    var newIssueJson= {
            "title": "Third Issue",
            "body": "This is 3rd Issue",
            "assignees": [
                "swat1508"
            ],
            "labels": [
                "bug"
            ]
        }
    

    var authorizationToken  =  'token  032dfa552e8662076ae3c61866629bd0be6a5a0c';
    let url = 'https://api.github.com/repos/swat1508/repository-111/issues';
              
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authorizationToken
            },
            body: JSON.stringify(newIssueJson)
        }
    )

    .then((response) => {
        debugger;
        statusCode = response.status;
        if (response.ok) {
            return response.json();
        } else {
            debugger;            
                    setRepoInWidgetForCreate("createIssue",myArray,statusCode);            
           // throw new Error('No response found');
        }
    })
    .then((jsonData) => {
        myArray = jsonData;
        setRepoInWidgetForCreate("createIssue",myArray,statusCode);
    })
    .catch((err) => {
        debugger;
        console.log("Error:", err.message);
    })

}  //create issue ends

else if (myData.search("add comment") != -1) {    //Add Comment Starts

    alert("add comment");
    var statusCode;

    var addCommentJson= {
            "body": "This is comment on issue 2"           
        }
    

    var authorizationToken  =  'token  032dfa552e8662076ae3c61866629bd0be6a5a0c';
    let url = 'https://api.github.com/repos/swat1508/repository-111/issues/2/comments';
              
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authorizationToken
            },
            body: JSON.stringify(addCommentJson)
        }
    )

    .then((response) => {
        debugger;
        statusCode = response.status;
        if (response.ok) {
            return response.json();
        } else {
            debugger;            
              setRepoInWidgetForCreate("addComment",myArray,statusCode);            
           // throw new Error('No response found');
        }
    })
    .then((jsonData) => {
        debugger;
        myArray = jsonData;
        setRepoInWidgetForCreate("addComment",myArray,statusCode); 
    })
    .catch((err) => {
        debugger;
        console.log("Error:", err.message);
    })
}  //Add Comment Ends


else if (myData.search("close issue") != -1) {     // Close Issue
    alert("Close Issues");

    var statusCode;
    var closeIssueJson= {
        "state":"close"
    }

    var authorizationToken  =  'token  032dfa552e8662076ae3c61866629bd0be6a5a0c';
    var repoName = 'repository-111';
    var issueNumber = 4;
    let url = 'https://api.github.com/repos/swat1508/' + repoName + '/issues/' + issueNumber;
    fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": authorizationToken
            },
            body: JSON.stringify(closeIssueJson)
        }
    )

    .then((response) => {
        debugger;
        statusCode = response.status;
        if (response.ok) {
            return response.json();
        } else {
            debugger;            
                     setRepoInWidgetForCreate("closeIssue",myArray,statusCode);            
                     throw new Error('No response found');
        }
    })
    .then((jsonData) => {
        debugger;    
        myArray = jsonData;
        setRepoInWidgetForCreate("closeIssue",myArray,statusCode);
    })
    .catch((err) => {
        debugger;
        console.log("Error:", err.message);
    })
}  //close issue ends

    
    else{
        alert("Type Suitable Command");}
           
    }

    //Get Operation Ends
//return myArray;
}

$('#submitButton').on('click', processRequestsForGit);

//processRequestsForGit);
function setResponseInWidgetForView(operationType,myArray,statusCode){
    debugger;

                   

debugger;
var tablearea = document.getElementById('myWidget');
var table = document.createElement('table');


//create table heading
if(operationType=="viewRepo"){      // View Repo Starts
    debugger;

    if(document.getElementById("tab_view_repo")){
        alert("Data Data Already There For Repo");
        return;
        }

        // if(document.getElementById("tab_view_issue")){
        //     debugger;
        //     document.getElementById('myWidget').removeChild;
            
        // }

        
table.setAttribute("id","tab_view_repo");
var tr = document.createElement('tr');   
tr.style.border="1px solid green";
var td1 = document.createElement('td');
var td2 = document.createElement('td');
var td3 = document.createElement('td');


td1.style.border="1px solid blue";
td2.style.border="1px solid blue";
td3.style.border="1px solid blue";

var text1 = document.createTextNode('REPO ID');
var text2 = document.createTextNode('REPO NAME');
var text3 = document.createTextNode('CLONE URL');

td1.appendChild(text1);
td2.appendChild(text2);
td3.appendChild(text3);
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
table.appendChild(tr);

//create table data
for (var i = 0; i < myArray.length; i++){
    var tr = document.createElement('tr');   
    tr.style.border="1px solid green";
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');


    td1.style.border="1px solid blue";
    td2.style.border="1px solid blue";
    td3.style.border="1px solid blue";

    var text1 = document.createTextNode(myArray[i].id);
    var text2 = document.createTextNode(myArray[i].name);
    var text3 = document.createTextNode(myArray[i].clone_url);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    table.appendChild(tr);
}
table.style.border="3px solid black";


var para1 = document.createElement('p');
var para1Value = document.createTextNode('This is list of repositories');
para1.appendChild(para1Value);

tablearea.appendChild(para1);
tablearea.appendChild(table);
} // View Repo Ends
else if(operationType=="viewIssue"){           //View Issue Starts
    debugger;
    if(document.getElementById("tab_view_issue")){
        alert("Data Data Already There For Issues");
        return;
        }

        table.setAttribute("id","tab_view_issue");
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
    var text3 = document.createTextNode('Issue URL');
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
        var text3 = document.createTextNode(myArray[i].url);

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
    
    
    var para1 = document.createElement('p');
    var para1Value = document.createTextNode('This is list of issues');
    para1.appendChild(para1Value);
    
    tablearea.appendChild(para1);
    tablearea.appendChild(table);
}    //View Ends

 
}   //setResponseInWidgetForView  ends



function setRepoInWidgetForCreate(operationType,myArray,statusCode){
    debugger;

    alert("setResponseInWidgetForCreate : " + statusCode);


    if(document.getElementById("tab_creat_repo")){
        alert("Data Already There");
        return;
      }
    //   if(document.getElementById("tab_create_issue")){
    //     document.getElementById("tab_create_issue").remove;
    //   }

if(operationType=="createRepo"){
if(statusCode==201){ 

    var tablearea = document.getElementById('myWidget');
    var table = document.createElement('table');

    table.setAttribute("id","tab_creat_repo");

//create table data
debugger;
var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
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
var repoOwnerNameTag = document.createTextNode("Repo Owner Login"); //Repo Owner Login
var repoOwnerName = document.createTextNode(myArray.name);
td1.appendChild(repoOwnerNameTag);
td2.appendChild(repoOwnerName);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);




    var para1 = document.createElement('p');
    var para1Value = document.createTextNode('The new repository has been created successfully');
    para1.appendChild(para1Value);
    tablearea.appendChild(para1);

    tablearea.appendChild(table);
} //201 ends
else if(statusCode==422){ 
    var tablearea = document.getElementById('myWidget');
    var para1 = document.createElement('p');
    var para1Value = document.createTextNode('Repository with this name already exists');
    para1.setAttribute("id","tab_created");
    para1.appendChild(para1Value);
    tablearea.appendChild(para1);
}
} //createRepo ends
else if(operationType=="createIssue"){
    if(statusCode==201){ 

        debugger;
    var tablearea = document.getElementById('myWidget');
    var table = document.createElement('table');

    table.setAttribute("id","tab_create_issue");

//create table data
debugger;
var tr = document.createElement('tr');   
var td1 = document.createElement('td');
var td2 = document.createElement('td');
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
var issueAssigneeTag = document.createTextNode("Issue Assignee"); //Issue Assignee
var issueAssignee = document.createTextNode(myArray.assignee.login);
td1.appendChild(issueAssigneeTag);
td2.appendChild(issueAssignee);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

var para1 = document.createElement('p');
var para1Value = document.createTextNode('The new issue has been created successfully');
para1.appendChild(para1Value);
tablearea.appendChild(para1);

tablearea.appendChild(table);


    }


}

if(operationType=="addComment"){
    if(statusCode==201){
        var tablearea = document.getElementById('myWidget');
        var table = document.createElement('table');
    
        table.setAttribute("id","tab_add_comment");
    
    //create table data
    debugger;
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
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
    var commentUrlTag = document.createTextNode("Issue URL");     //Commment URL
    var commentUrl = document.createTextNode(myArray.issue_url);
    td1.appendChild(commentUrlTag);
    td2.appendChild(commentUrl);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

var para1 = document.createElement('p');
var para1Value = document.createTextNode('The comment has been added to the issue');
para1.appendChild(para1Value);
tablearea.appendChild(para1);
tablearea.appendChild(table);
    }
}

if(operationType=="closeIssue"){  
    if(statusCode==200){
        var tablearea = document.getElementById('myWidget');
        var table = document.createElement('table');
    
        table.setAttribute("id","tab_add_comment");
    
    //create table data
    debugger;
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
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
    var commentStateTag = document.createTextNode("Commment State");     //Commment State
    var commentState = document.createTextNode(myArray.state);
    td1.appendChild(commentStateTag);
    td2.appendChild(commentState);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

var para1 = document.createElement('p');
var para1Value = document.createTextNode('The issue has been deleted');
para1.appendChild(para1Value);
tablearea.appendChild(para1);
tablearea.appendChild(table);        
    }}



}


const GitOperations = require('./../services/gitOperations.js');
const $gitOps = new GitOperations();


const InvokeRecast = require('./../services/recastOperations.js');
const $reCast = new InvokeRecast();

module.exports = $(document).ready(function () {

    $('#userTextBox').keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $reCast.invokeReact();
        }
    });


    //Buttton Click Events
    $("#createRepoOk").on('click', function () {  // Ok Button in Create Repo
        debugger;
        document.getElementById("createRepoClose").click();
        var repoName = document.getElementById("create-repo-repoName").value;
        var repoDesc = document.getElementById("create-repo-repoDesc").value;
        let url = 'https://api.github.com/user/repos';
        var newRepoJson = {
            "name": repoName,
            "description": repoDesc,
            "homepage": "https://github.com",
            "private": false,
            "has_issues": true,
            "has_wiki": true
        }
        var objData = {};
        objData.url = url;
        objData.method = "POST";
        objData.jsonData = newRepoJson;
        objData.operation = "createRepo";
        $gitOps.processFetchApiWithPost(objData);

    });

    $("#createIssueOk").on('click', function () { // Ok Button in Create Issue
        debugger;
        document.getElementById("createIssueClose").click();

        var repoName = document.getElementById("create-issue-repoName").value;
        var issueTitle = document.getElementById("create-issue-issueTitle").value;
        var issueBody = document.getElementById("create-issue-issueDesc").value;


        let url = "https://api.github.com/repos/swat1508/" + repoName + "/issues";
        var newIssueJson = {
            "title": issueTitle,
            "body": issueBody,
            "assignees": [
                "swat1508"
            ],
            "labels": [
                "bug"
            ]
        }
        var objData = {};
        objData.url = url;
        objData.method = "POST";
        objData.operation = "createIssue";
        objData.jsonData = newIssueJson;
        debugger;
        $gitOps.processFetchApiWithPost(objData);
    });


    $("#closeIssueOk").on('click', function () { // Ok Button in Close Issue
        debugger;
        document.getElementById("closeIssueClose").click();

        var repoName = document.getElementById("close-issue-repoName").value;
        var issueNumber = document.getElementById("close-issue-target").value;

        let url = "https://api.github.com/repos/swat1508/" + repoName + '/issues/' + issueNumber;
        var closeIssueJson = {
            "state": "close"
        }
        var objData = {};
        objData.url = url;
        objData.jsonData = closeIssueJson;
        objData.method = "PATCH";
        objData.operation = "closeIssue";
        $gitOps.processFetchApiWithPost(objData);

    });

    $("#addCommentOk").on('click', function () { // Ok Button in Add Comment
        debugger;
        document.getElementById("addCommentClose").click();

        var repoName = document.getElementById("add-comment-repoName").value;
        var issueNumber = document.getElementById("add-comment-issueNumber").value;
        var commentBody = document.getElementById("add-comment-commentBody").value;

        let url = "https://api.github.com/repos/swat1508/" + repoName + '/issues/' + issueNumber + "/comments";
        var addCommentJson = {
            "body": commentBody
        }
        var objData = {};
        objData.url = url;
        objData.jsonData = addCommentJson;
        objData.method = "POST";
        objData.operation = "addComment";
        $gitOps.processFetchApiWithPost(objData);
    });
    $("#addCollaboratorOk").on('click', function () { // Ok Button in Add Collaborator
        debugger;
        document.getElementById("addCollaboratorClose").click();
        var repoName = document.getElementById("add-collaborator-repoName").value;
        var collaboratorName = document.getElementById("add-collaborator-target").value;

        let url = 'https://api.github.com/repos/swat1508/' + repoName + '/collaborators/' + collaboratorName;
        var addCollaboratorJson = {

        }

        var objData = {};
        objData.url = url;
        objData.jsonData = addCollaboratorJson;  // Json needed for Add Collaborator Operation
        objData.method = "PUT";
        objData.operation = "addCollaborator";
        $gitOps.processFetchApiWithPost(objData);
    });


})
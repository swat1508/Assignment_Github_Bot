
const ModalValidator = require('./../dataValidators/modalValidator.js');
const $modalVal = new ModalValidator();

module.exports = class InvokeRecast {
    
invokeReact(){
    alert("invokeReact callled");
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
                $modalVal.displayModal(intent,intentData);
               // processRequestsForGit(intent,intentData);                
            });
        })
        .catch(function(error) {
            console.error('Fetch Error =\n', error);
        });

     } //connect to recast.ai ends

     


}
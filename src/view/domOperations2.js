

module.exports = class DomOperations { 
    setResponseInWidget(operationType,myArray,statusCode){
        debugger;
    alert("setResponseInWidget : " + statusCode);

        if(document.getElementById("command_result")){   
            var parent = document.getElementById('myWidget');
            var child = document.getElementById("command_result");
            parent.removeChild(child);
        }
        var tablearea = document.getElementById('myWidget');

         if(operationType=="viewIssues"){ 
           if(statusCode==200){
            tablearea.appendChild(this.showViewRepoResults(myArray));                     
           }  //statusCode check ends
        }  //operationType as createRepo ends 
        
    }; //setResponseInWidget ends

         /*
            // Working Code but shwoing a colon in display starts            
                        ${myArray.map(issue =>
                             `<li>Title is : ${issue.title} and Body : ${issue.body} </li>`                 
                                )}
            // Working Code but shwoing a colon in display ends
            
            //to remove a colon in display starts
                    ${myArray.map(issue =>
                        `<li>Title is : ${issue.title} and Body : ${issue.body} </li>`                 
                           ).join('')}
            //to remove a colon in display ends  
            */



//Try Code Starts
showViewRepoResults(myArray) {
    const viewRepoData = this.createHTMLElement(`
    <div class="tableBorder">    
        <h5 class="card-title">List Of Issues Are : </h5>
        <table> 
        <tr> <td class="tableCellBorder">Issue Number</td>
             <td class="tableCellBorder">Issue Id</td> 
             <td class="tableCellBorder">Issue Body</td>
              <td class="tableCellBorder">Issue Title</td> 
              <td class="tableCellBorder">Issue State</td> 
        </tr>

        ${myArray.map(issue =>
            `<tr> <td class="tableCellBorder"> ${issue.number} </td>
                  <td class="tableCellBorder"> ${issue.id} </td>
                  <td class="tableCellBorder"> ${issue.body} </td>
                  <td class="tableCellBorder"> ${issue.title} </td>
                  <td class="tableCellBorder"> ${issue.state} </td>
            </tr>`                 
               ).join('')}

        </p>
    
    </div>
    `);  
  //Try Code Ends
  
  // <button href="#" class="addBtn btn btn-primary">Add</button>       //this line was added before </div> above
//     const addButton = viewRepoData.querySelector('button');
//   addButton.addEventListener('click', this.addButtonInViewRepoPage);

 return viewRepoData;
};


     createHTMLElement(html) {
        debugger;
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstElementChild;
      };

      addButtonInViewRepoPage(){
        alert('addButtonInViewRepoPage clicked');
      };
      

     // document.getElementById('app').appendChild(movieCard);


    }












/*

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
var repoDescTag = document.createTextNode("Repo Desc");     //Repo Desc
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
*/






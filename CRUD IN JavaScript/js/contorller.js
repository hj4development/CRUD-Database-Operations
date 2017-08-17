window.addEventListener("load",()=>{
 document.getElementById("add").addEventListener("click",add);
 document.getElementById("delete").addEventListener("click",delMarked);
 document.getElementById("search").addEventListener("click",search);
 document.getElementById("update").addEventListener("click",update);
 document.getElementById("sort").addEventListener("click",sort);
 document.getElementById("clear").addEventListener("click",clear);
 document.getElementById("save").addEventListener("click",save);
 document.getElementById("load").addEventListener("click",load);
 document.getElementById("clearStorage").addEventListener("click",clearStorage);
 clearfields();
})

function add(){
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var qt = document.getElementById("qt").value;
    var url = document.getElementById("url").value;
    doOperation.addNewItem(name,desc,price,qt,url);
    printItem(doOperation.getItem());
    clearfields();
}

function printItem(itemObject){
    var tbody = document.getElementById("itemlist");
    var tr = tbody.insertRow();
    var index = 0;
    for(var key in itemObject){
        if(key == "markForDeletion"|| key == "markForSearch" || key == "markForUpdation" || key =="markForEdition"){
            if(itemObject.markForSearch){
                tr.classList.add("yellow");
            }
            if(itemObject.markForDeletion){
                tr.classList.add("red");
                
            }
            
            if(itemObject.markForUpdation && doOperation.EnterInUpdate ==1){
                tr.classList.add("green");
            
                doOperation.EnterInUpdate = 0;
                itemObject.markForUpdation=false;
                itemObject.markForEdition = false;
            
            }
            if(itemObject.markForEdition){
                tr.classList.add("skyBlue");
            }
            continue;
        }
        tr.insertCell(index).innerHTML=itemObject[key];
        index++;
    }
    var delImg = document.createElement("img");
    delImg.src="images/delete.png";
    delImg.setAttribute("itemno",itemObject.id);
    delImg.className="showCursor";
    delImg.addEventListener("click",markRed);
    tr.insertCell(index).append(delImg);
    index++;
    var EditImg = document.createElement("img");
    EditImg.src="images/edit.png";
    EditImg.setAttribute("itemno",itemObject.id);
    EditImg.className="showCursor";
    
    
    EditImg.addEventListener("click",markSkyBlue);
    
    tr.insertCell(index).append(EditImg);
}

function clearStorage(){
    
        if(localStorage.items){  
            if(confirm("This action will clear the localStorage")==true){
            localStorage.clear();
            }
        }
        else{
            alert("localStorage is empty already");
        }
    
}

function save(){
    if(doOperation.itemList.length!==0){
    var json = JSON.stringify(doOperation.itemList);
    console.log(json);
    localStorage.items = json;
    alert("Data is saved");
    }
    else{
        alert("There is no data to save");
    }
}

function load(){
    if(localStorage){
        if(localStorage.items){
            document.getElementById("itemlist").innerHTML = " ";
            var items = JSON.parse(localStorage.items);
            doOperation.itemList = items;
            printSetOfItems(doOperation.itemList);
            doOperation.id = doOperation.itemList[doOperation.itemList.length-1].id+1;
            document.getElementById("id").innerHTML = doOperation.id;
            }
        else{
              alert("No Data is there to show.");
            }
    }
    else{
        alert("Your browser does not support localStorage");
    }
}

function clear(){
    if(doOperation.itemList.length!==0){
    if(confirm("This list will be deleted after this action")==true){
     doOperation.id = 1;
     document.getElementById("id").innerHTML = 1;
     document.getElementById("itemlist").innerHTML=" ";
     doOperation.itemList.splice(0,doOperation.itemList.length);
    }
    }
    else{
        alert("there is no data to clear");
    }
}

function sort(){
    document.getElementById("itemlist").innerHTML=" ";
    printSetOfItems(doOperation.sort());
}

//Related to update
function markSkyBlue(){
    
  if(doOperation.count1==1){
       doOperation.count2 = event.srcElement.getAttribute("itemno");
       doOperation.count1=0;
    }

  if(doOperation.count2==event.srcElement.getAttribute("itemno")){ 
      doOperation.check++;
      if(doOperation.check == 2){
         doOperation.count1=1;
         doOperation.check = 0;
         }
      var tr = event.srcElement.parentElement.parentElement;
    
      tr.classList.toggle("skyBlue");
      tr.classList.remove("yellow");
      tr.classList.remove("red");
      tr.classList.remove("green");
    
      var itemObject = doOperation.setMarkForUpdation(event.srcElement.getAttribute("itemno"));
      document.getElementById("id").innerHTML=itemObject.id;
      for(var key in itemObject){
          if(key == "id" || key == "markForDeletion"|| key == "markForSearch" || key == "markForUpdation" || key =="markForEdition"){
            continue;
           }
          document.getElementById(key).value=itemObject[key];
         }
      }
  else{
      alert("You are allowed to edit one entry at a time :-)");
      }

}

function update(){
    var id = document.getElementById("id").innerHTML;
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var qt = document.getElementById("qt").value;
    var url = document.getElementById("url").value; 
    document.getElementById("itemlist").innerHTML = " ";
    printSetOfItems(doOperation.updateMarked(id,name,desc,price,qt,url));
    document.getElementById("id").innerHTML=doOperation.getId();
    document.getElementById("name").value=" ";
    document.getElementById("desc").value=" ";
    document.getElementById("price").value=" ";
    document.getElementById("qt").value=" ";
    document.getElementById("url").value=" ";
}

//Related to delete
function markRed(){
    
    var tr = event.srcElement.parentElement.parentElement;
    tr.classList.remove("yellow");
    tr.classList.remove("skyBlue");
    tr.classList.remove("green");
    tr.classList.toggle("red");
    doOperation.setMarkForDeletion(event.srcElement.getAttribute("itemno"));
}

function delMarked(){
    if(doOperation.itemList.length!==0){
            var c =doOperation.checkMarked();
            if(c){
               if(confirm("Selected items will be deleted after this action")== true){
               document.getElementById("itemlist").innerHTML=" ";
               printSetOfItems(doOperation.delItems());
               }
           }
     }
}
function printSetOfItems(Items){
    Items.forEach(function(itemObject){
        printItem(itemObject);
    });
}

function search(){
    var itemName = document.getElementById("name").value;
    if(doOperation.searchItem(itemName)[0]){
        document.getElementById("itemlist").innerHTML=" ";
        printSetOfItems(doOperation.searchForColorChange(itemName));
    }
}

function clearfields(){
    var allFields = document.getElementsByClassName("clearfields");
    for(var i =0;i<allFields.length;i++){
        allFields[i].value = " ";
    }
    document.getElementById("id").innerHTML=doOperation.getId();
    document.getElementById("name").focus();
}
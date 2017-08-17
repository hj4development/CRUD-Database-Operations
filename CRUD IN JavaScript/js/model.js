function items(id,name,desc,price,qt,url){
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.qt = qt;
    this.url = url;
    this.markForDeletion = false;
    this.markForSearch = false;
    this.markForUpdation = false;
    this.markForEdition = false;
}

var doOperation={
    id:1,
    itemList:[],
    EnterInUpdate:0,
    count1:1,//used in edit case
    count2:0,//used in edit case
    check:0,//used in edit case
    check2:0,//used in updateMarked()

    addNewItem:function(name,desc,price,qt,url){
        var itemObject = new items(this.id,name,desc,price,qt,url);
        this.itemList.push(itemObject);
        this.id++;
    },
    
    getItem:function(){
        return this.itemList[this.itemList.length-1];
    },
    
    getId:function(){
        return this.id;
    },
    
    setMarkForDeletion:function(itemNo){
        this.itemList.forEach(function(itemObject){
             if(itemObject.id==itemNo){
                 itemObject.markForDeletion = !itemObject.markForDeletion;
                 if(itemObject.markForUpdation){
                 itemObject.markForUpdation = !itemObject.markForUpdation;
                  }
                 if(itemObject.markForSearch){
                     itemObject.markForSearch = !itemObject.markForSearch;
                 }
                 if(itemObject.markForEdition){
                     doOperation.count1=1;
                     doOperation.check =0;
                     itemObject.markForEdition = !itemObject.markForEdition;
                 }
             }
        }); 
    },
    
    checkMarked:function(){
        var chk = 0;
        this.itemList.forEach(function(itemObject){
            if(itemObject.markForDeletion==true){
                chk++;
            }
        });
        return chk;
    },
    
    delItems:function(){
             return this.itemList = this.itemList.filter(function(itemObject){
                    return itemObject.markForDeletion == false;
        });
     },
    
    searchItem:function(name){
        return this.itemList.filter(function(itemObject){
            return itemObject.name == name;
        })
    },
    
    searchForColorChange:function(name){
        console.log(this.itemList);
        this.itemList.forEach(function(itemObject){
            if(itemObject.name==name && itemObject.markForSearch==false){
                itemObject.markForSearch = !itemObject.markForSearch;
                
                if(itemObject.markForDeletion){
                    itemObject.markForDeletion = !itemObject.markForDeletion;
                }
                if(itemObject.markForUpdation){
                    itemObject.markForUpdation = !itemObject.markForUpdation;
                }
                if(itemObject.markForEdition){
                    doOperation.count1=1;
                    doOperation.check =0;
   
                    itemObject.markForEdition = !itemObject.markForEdition;
                }
            }
        });
        return this.itemList;
    },
    
    setMarkForUpdation:function(itemNo){
        var obj;
        this.itemList.forEach(function(itemObject){
            if(itemObject.id == itemNo){
                
                doOperation.check2 =1;
                
                itemObject.markForEdition = !itemObject.markForEdition;
                itemObject.markForUpdation = !itemObject.markForUpdation;
                
    
                if(itemObject.markForDeletion){
                itemObject.markForDeletion = !itemObject.markForDeletion;
                 }
                if(itemObject.markForSearch){
                    itemObject.markForSearch = !itemObject.markForSearch;
                }
                 
                obj = itemObject;
                 
            }
        });
        return obj;
    },
    
    updateMarked:function(id,name,desc,price,qt,url){
            this.count1=1;
            this.check =0;
        if(this.check2 ==1){
        this.EnterInUpdate =1;
        this.check2 =0;
        }
        this.itemList.forEach(function(itemObject){
            if(itemObject.markForUpdation){
                itemObject.id = id;
                itemObject.name = name;
                itemObject.desc = desc;
                itemObject.price = price;
                itemObject.qt = qt;
                itemObject.url = url;
            }
        });
        return this.itemList;
    },
    
    sort:function(){
       return this.itemList = this.itemList.sort(function(itemObject1,itemObject2){
            return itemObject1.price-itemObject2.price;
        })
    },
}
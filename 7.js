/*version 0.5*/

const fs=require("fs");
const path=require("path");

//let inbox="C:/Users/administrator/Box/inbox";
//let data="z:/app/stores";

let inbox="C:/Users/administrator/Desktop/junk/Inbox";
let data="C:/Users/administrator/Desktop/junk/stores";

let renamePlus=(original,destination,callback)=>{
  fs.copyFile(original,destination,err=>{
    fs.unlink(original,callback);
  });
}

let deleteElement=(array,element)=>{
  let index = array.indexOf(element);
  if (index > -1) array.splice(index, 1);
  return array;
}

let getFilename=filepath=>{
    let ext=path.extname(filepath)
    return path.basename(filepath,ext)
}

let isExist=folderName=>{
  try {
    fs.accessSync(folderName);
    return true;
  } catch (err) {
    return false;
  }
}

let getISOTimeStamp=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z|-|:| |\./g,"");
}

let count=0;
let prss=[];

//console.log(`Start Watching ${inbox}`);


fs.watch(inbox,{recursive:true},(event, filename)=>{

  if(!filename) return;

  let original=path.join(inbox,filename);
  if(prss.includes(original)) return;
  let basename=path.basename(filename,path.extname(filename));

  let company,category;


  //company=basename.split("_")[1];
  //console.log(basename+"test");

  if(/^ddsr|seafood|meat|produce/i.test(basename)){
    category="vendors";
    if(!company) company="unfiled";
  }
  else if(/^crf|^eod/i.test(basename)){
    category="sales";
    if(!company) company="unfiled";
  }

  else{
    category="unfiled";
    company="";
  }

  let companyDir=path.join(data,category,company);

/*  
  if(!isExist(companyDir)) fs.mkdirSync(companyDir);
*/

  let destination=path.join(companyDir,basename+"_"+path.dirname(filename)+"_"+getISOTimeStamp(new Date)+path.extname(filename));

  prss.push(original);


  renamePlus(original,destination,err=>{
    if(err) {
      /*console.log(err);*/
    }
    else{
      console.log(count++);
/*
      console.log({
        time:(new Date).toLocaleString(),
        original:original,
        destination:destination,
        countSinceLastLaunch:count++
      });*/
    }

    deleteElement(prss,original);
  });



});
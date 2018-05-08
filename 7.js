const fs=require("fs");
const path=require("path");

let inbox="C:/Users/administrator/Box/testinbox";
let data="z:/app/stores";


let trigChange=pathname=>{
  fs.mkdir(pathname,err=>{
    fs.rmdir(pathname,err=>{});
  });
}

let renamePlus=(original,destination,callback)=>{
  fs.copyFile(original,destination,err=>{
    fs.unlink(original,callback);
  });
}

let processing=[];

let deleteElement=(array,element)=>{
  let index = array.indexOf(element);
  if (index > -1) array.splice(index, 1);
  return array;
}


fs.watch(inbox,{recursive:true},(event, storeFolder)=>{

  storeFolder=path.dirname(storeFolder);
  
  //console.log(event,storeFolder);

  let storePath=`${inbox}/${storeFolder}`;

	
  fs.readdir(storePath,(err,files)=>{


    //console.log(files.length);
    if(files.length>0){

      for(let x of files){

        let ext=path.extname(x).toLowerCase();
        let filename=path.basename(x,ext).toLowerCase();

        let arr=filename.split("_");
        let type=arr[0].toLowerCase();
        let name=arr[1]?arr[1].toLowerCase():0;

        let categoryFolder;

        if(/v/i.test(type)) categoryFolder="vendors";
        else if(/s/i.test(type)) categoryFolder="sales";
        else categoryFolder="other";

        let originalPath=`${storePath}/${x}`;
        let tempPath=`${storePath}/temp`;

        let targetFolder;

        targetFolder=`${data}/${categoryFolder}/${name}`;


        fs.mkdir(targetFolder,err=>{
        
          targetFilename=`${filename}_${storeFolder}_${(new Date).getTime()}${ext}`;

/*
          console.log({
            from:originalPath,
            to:`${targetFolder}/${targetFilename}`
          });*/

          //console.log(processing.length);

          if(processing.includes(originalPath)) return;

          renamePlus(originalPath,`${targetFolder}/${targetFilename}`,err=>{

            console.log(`start copying ${originalPath}`);
            if(err){
              //console.log(err);
              /*change event trigger*/
              //setTimeout(()=>{trigChange(tempPath)},500);
            }
            else deleteElement(processing,originalPath);
          });

          if(!processing.includes(originalPath)) processing.push(originalPath);



        });
      }
    }
  });
});
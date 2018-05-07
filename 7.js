const fs=require("fs");
const path=require("path");

let trigChange=pathname=>{
  fs.mkdir(pathname,err=>{
    fs.rmdir(pathname,err=>{});
  });
}

fs.watch("inbox",(event, storeFolder)=>{

  let storePath=`inbox/${storeFolder}`;

	fs.readdir(storePath,(err,files)=>{
    console.log(files.length);
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

        targetFolder=`data/${categoryFolder}/${name}`;


        fs.mkdir(targetFolder,err=>{
        
          targetFilename=`${filename}_${storeFolder}_${(new Date).getTime()}${ext}`;

          fs.rename(originalPath,`${targetFolder}/${targetFilename}`,err=>{
            if(err){
              console.log(err);
              /*change event trigger*/
              setTimeout(()=>{trigChange(tempPath)},500);
            }
            else console.log({
              from:originalPath,
              to:`${targetFolder}/${targetFilename}`
            });
          });

        });
      }
    }
  });
});
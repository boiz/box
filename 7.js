const fs=require("fs");
const path=require("path");

let getISOTime=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z/g," ").substr(0,19);
}

//console.log=null;

fs.watch("inbox",(event, folder)=>{

  let folderPath=`inbox/${folder}`;

	fs.readdir(folderPath,(err,files)=>{
    console.log(files.length);
    if(files.length>0){

      for(let x of files){

        let arr=x.split("_");
        let type=arr[0];
        let person=arr[1];
        //let store=arr[2];

        let ext=(path.extname(x));

        let targetFolder;

        if(/v/i.test(type)) targetFolder="venders";
        else if(/s/i.test(type)) targetFolder="sales";
        else targetFolder="other";


        let target=`data/${targetFolder}/${person}_${folder}_${getISOTime(Date()).replace(/-| |:/g,"")}.${ext}`;

        fs.rename(`${folderPath}/${x}`,target.toLowerCase(),err=>{
          if(err){
            console.log(err);
            /*change event trigger*/
            setTimeout(()=>{fs.writeFile(`${folderPath}/err.log`,err=>{})},500);
          }
          else console.log(`inbox/${folder}/${x} transferred successfully`);
        });
      }

    }

  });
});
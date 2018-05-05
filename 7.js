const fs=require("fs");

let getISOTime=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z/g," ").substr(0,19);
}


fs.watch("inbox",(event, folder)=>{
	fs.readdir(`inbox/${folder}`,(err,files)=>{
    //console.log(files);


    let moveThem=()=>{

      for(let x of files){
        //console.log(`inbox/${folder}/${x}`,`data/${x}`);
        fs.rename(`inbox/${folder}/${x}`,`data/${x}`,err=>{
          
        });
      }

    }

    moveThem();

    let intv=setInterval(()=>{
      if(files.length==0) clearInterval(intv);
      moveThem();

      console.log(files);

    },1000);


  });


    //console.log('event is: ' + event);
/*    if (folder) {
        console.log('filename provided: ' + folder);
    } else {
        console.log('filename not provided');
    }*/

});


/*fs.rename('inbox/store1/ubuntu-16.04.4-desktop-amd64.iso', 'data/1', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});*/
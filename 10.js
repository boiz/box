const fs=require("fs");

let trigChange=pathname=>{
  fs.mkdir(pathname,err=>{
    fs.rmdir(pathname,err=>{});
  });
}

let inbox="C:/Users/administrator/Box/testinbox";


/*trigger all store folders*/
fs.readdir(inbox,(err,files)=>{
	for(let x of files){
		trigChange(`${inbox}/${x}/temp`);
	}
});




fs.watch(inbox,{recursive:true},(a,b)=>console.log(a,b));
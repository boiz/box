const fs=require("fs");

const path=require("path");

/*


fs.access("inbox",err=>{
	console.log(err);
});

fs.mkdir("testdir",err=>{
	console.log(err);

});

*/


/*let getISOTime=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z/g," ");
}




let x="v_google.pdf";



let ext=path.extname(x);
let filename=path.basename(x,ext);


console.log(filename,ext);*/


fs.watch("inbox",(event,filename)=>{
	console.log(event);
});
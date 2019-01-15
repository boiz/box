const fs=require("fs");
const path=require("path");

let inbox="d:/box";
let data="z:/app/stores/test";

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


let count=0;
let pss=[];

fs.watch(inbox,{recursive:true},(event, filename)=>{

	if(!pss.includes(filename)){
		pss.push(filename);
		console.log(event,filename,count++);


		setTimeout(()=>{
			deleteElement(pss,filename);
		},2000);
	}



});
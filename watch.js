/*version 0.5*/

const fs=require("fs");
const path=require("path");

let inbox="C:/Users/administrator/Box/testInbox";
let data="C:/Users/administrator/Desktop/junk";

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

let getISOTimeStamp=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z|-|:| |\./g,"");
}

let count=0;
let prss=[];

console.log(`Start watching ${inbox}`);

fs.watch(inbox,{recursive:true},(event, filename)=>{

	if(!filename) return;
	let original=path.join(inbox,filename);

	if(prss.includes(original)) return;


	let basename=path.basename(filename,path.extname(filename));
	let category,company=path.dirname(filename);

	console.log(basename);

	if(/^crf|^eod/i.test(basename)){
		category="4. Sales";
	}

	else if(/^ddsr/i.test(basename)){
		category="2. Accounts Payables/DDSR";
	}

	else{
		category="0. Unfiled";
	}

	let destination=path.join(data,category,company,basename+"_"+path.dirname(filename)+"_"+getISOTimeStamp(new Date)+path.extname(filename));

	prss.push(original);

	//console.log(event,filename,count++);

	renamePlus(original,destination,err=>{
		if(err) {
			//console.log(err);
		}
		else{
			console.log(`${(new Date).toLocaleString()} ${destination} transferred successfully id# ${count++}`);
		}
		deleteElement(prss,original);
	});


});
const fs=require("fs");
const path=require("path");



let inbox="C:/Users/administrator/Box/testinbox";
let data="z:/app/teststores";
let count=0;


let renamePlus=(original,destination,callback)=>{
  fs.copyFile(original,destination,err=>{
    fs.unlink(original,callback);
  });
}
let getFilename=filepath=>{
    let ext=path.extname(filepath)
    return path.basename(filepath,ext)
}



let scanAll=(inbox,callback)=>{
	fs.readdir(inbox,(err,names)=>{
		for(let x of names){
			let folder=path.join(inbox,x);
			fs.readdir(folder,(err,names)=>{
				if(!names) return;
				if(names.length==0) return;
				for(let x of names){
					callback(path.join(folder,x));
				}
			});
		}
	});
}

scanAll(inbox,link=>{
	//console.log(link);

	let original=link;
	let destination=path.join(data,getFilename(original));


	renamePlus(original,destination,err=>{
		if(err) {
			console.log(err);
		}
		else{
			console.log(`${(new Date).toLocaleString()} ${destination} transferred successfully id# ${count++}`);
		}
	});


});




//console.log(path.join(inbox,"oxnard"));
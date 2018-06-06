const fs=require("fs");
const path=require("path");

let inbox="C:/Users/administrator/Box/testInbox";
let data="z:/app/stores";


let count=0;



fs.readdir(inbox,(err,res)=>{
	if(err) throw err;
	for(let x of res){
		let folder=path.join(inbox,x);
		fs.readdir(folder,(err,res)=>{
			if(err) throw err;
			for(let x of res){
				//console.log(path.join(folder,x));
				
				//console.log(path.extname(x));

				count++;
			}
			console.log(count);
		});
	}
});




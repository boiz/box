const fs=require("fs");
const path=require("path");

const inbox="C:/Users/administrator/Box/testInbox";
const data="z:/app/stores";

let count=0;

fs.readdir(inbox,(err,res)=>{
	if(err) throw err;
	for(let x of res){
		const folder=path.join(inbox,x);
		fs.readdir(folder,(err,res)=>{
			
			for(const x of res){

				//console.log(folder);

				fs.access(path.join(folder,x),(err)=>{
					
					if(err) console.log(x);
				});

				//console.log(x);
				//console.log(path.join(folder,x));

				//if(path.extname(x)) console.log(x);
				
			}
			//console.log(count);
		});
	}
});

fs.access("C:/Users/administrator/Box/testInbox/024 Temecula",(err)=>{
	
	console.log(err);
});


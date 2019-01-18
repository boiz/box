const fs=require("fs");
const path=require("path");

const inbox="C:/Users/administrator/Box/testInbox";
const data="z:/app/stores";

const renamePlus=(original,destination,callback)=>{
  fs.copyFile(original,destination,err=>{
    fs.unlink(original,callback);
  });
}


let count=0;
console.log();



fs.readdir(inbox,(err,res)=>{
	if(err) throw err;
	for(let x of res){
		const folder=path.join(inbox,x);
		fs.readdir(folder,(err,res)=>{
			if(err) return;
			for(const x of res){

				//console.log(folder);

				fs.readdir(path.join(folder,x),err=>{
					if(err){
						console.log(`${path.join(folder,x)}, id#${count++}`);

												
					}




				});

				
			}

		});
	}
});


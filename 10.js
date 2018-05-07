const fs=require("fs");


fs.watch("d:/",err=>{
	console.log(err);
});



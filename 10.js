const fs=require("fs");

fs.watch("inbox",(event, folder)=>{

	console.log(event);

});
require("isomorphic-fetch");
const Dropbox = require("dropbox").Dropbox;
const dbx = new Dropbox({ accessToken: "dntVyL57BkAAAAAAAAAACz8oVc49RPD4goS0P1jrZAYLI3ZNmLYAXogTNRuEKP8S"});
const fs= require("fs");
const chokidar = require("chokidar");
const path=require("path");
const url=require("url");




const upload=(boxPath,buffer,callback)=>{

	dbx.filesUpload({ path: boxPath, contents: buffer }).then(callback).catch(callback);

}








fs.readFile("d:/downloads/1_cLOUD_Log_Page1.html",(err,buffer)=>{
	//console.log(err,res);

/*	upload("/box/222.zip",buffer,arg=>{
		console.log(arg);
	});*/



});


const source="C:/Users/Liang/Desktop/IPDI";


chokidar.watch(source,{ignored: /(^|[\/\\])\../}).on("add", pa=>{


	//console.log(pa);
/*
	if(event=="add") fs.readFile(pa,(err,contents)=>{

		//const boxPath=winToLinux(pa).replace(source,"");
	
		count.all+=1;

		console.log(boxPath);
		//upload(boxPath,contents);

	});*/

});



dbx.filesUploadSessionFinishBatchCheck();


const
Reset = "\x1b[0m",
Bright = "\x1b[1m",
Dim = "\x1b[2m",
Underscore = "\x1b[4m",
Blink = "\x1b[5m",
Reverse = "\x1b[7m",
Hidden = "\x1b[8m",

FgBlack = "\x1b[30m",
FgRed = "\x1b[31m",
FgGreen = "\x1b[32m",
FgYellow = "\x1b[33m",
FgBlue = "\x1b[34m",
FgMagenta = "\x1b[35m",
FgCyan = "\x1b[36m",
FgWhite = "\x1b[37m",

BgBlack = "\x1b[40m",
BgRed = "\x1b[41m",
BgGreen = "\x1b[42m",
BgYellow = "\x1b[43m",
BgBlue = "\x1b[44m",
BgMagenta = "\x1b[45m",
BgCyan = "\x1b[46m",
BgWhite = "\x1b[47m";

const consoleEx={
	log:(color,msg)=>{
		console.log(color,`${(new Date).toLocaleString()} ${msg}`);
	}
}

const fs=require("fs");
const pa=require("path");
const chokidar = require("chokidar");
const mkdirp=require("mkdirp");

//const inbox="C:/Users/administrator/Box/testInbox",cbntRoot="C:/Users/administrator/Desktop/junk"; //for dev
const inbox="C:/Users/administrator/Box/Inbox", cbntRoot="w:/"; //real



const get=(path,what)=>{

	const arr=path.split("\\");
	switch(what){

		case "storeId":
			return /\d+/.exec(arr[arr.length-3])[0];
			break;
		case "storeName":
			return /[a-z| ]+/i.exec(arr[arr.length-3])[0].trim();
			break;
		case "category":
			return arr[arr.length-2];
			break;
		case "fileName":
			return arr[arr.length-1];
			break;
	}

}

const getISODate=()=>{
  date=new Date();
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z|-|:| |\./g,"").substr(0,8);
}

let count=0;
let x=0;

const move=(original,destination)=>{

	//consoleEx.log(FgWhite,`Queue file ${original}`)	;
  fs.copyFile(original,destination,copyErr=>{

  	if(copyErr){
  		if(copyErr.code=="ENOENT") consoleEx.log(FgRed,`Move file failed from ${original} Notes: Target Folder doesn't exist`);
  	}
  	else{
  		fs.unlink(original,err=>{
  			if(!err) consoleEx.log(FgGreen,`Move file succeeded to ${destination}`);
  		});	
  	}
  });
}

chokidar.watch(inbox, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
	console.log(FgWhite,`Item Scanned ${++count} ${event}`);
	let category=get(path,"category");
	if(!/CRF|DSD|EOD|OTHER/i.test(category)||event=="unlink") return;

	const fileName=get(path,"fileName");
	const storeName=get(path,"storeName");
	const storeId=get(path,"storeId");
	const extName=pa.extname(fileName);
	const baseName=pa.basename(fileName,extName);


	if(/OTHER/i.test(category)) category="OTH";


	const desDir=pa.join(cbntRoot,"Abacus",storeName,getISODate(),category);
	const desFileName=`${storeId}${category}${getISODate()}-${++x}${extName}`;
	const desFull=pa.join(desDir,desFileName);

	console.log(`desDir is ${desDir}, desFileName is ${desFileName}`);

	mkdirp(desDir,err=>{
		if(err) return;
		move(path,desFull);
	});

});

consoleEx.log(FgCyan,`Start watching ${inbox}`);

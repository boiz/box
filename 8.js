const fs=require("fs");
const path=require("path");
const chokidar = require("chokidar");

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
BgWhite = "\x1b[47m"

const inbox="C:/Users/administrator/Box/Inbox", data="w:/"; //real
//const inbox="C:/Users/administrator/Box/testInbox",data="C:/Users/administrator/Desktop/junk"; //for dev


const consoleEx={
	log:(color,msg)=>{
		console.log(color,`${(new Date).toLocaleString()} ${msg}`);
	}
}

const getISOTimeStamp=date=>{
  date=new Date(date);
  return new Date(date-date.getTimezoneOffset()*60000).toISOString().replace(/T|Z|-|:| |\./g,"");
}

const move=(original,destination)=>{

	consoleEx.log(FgWhite,`Queue file ${original}`)	;
  fs.copyFile(original,destination,copyErr=>{

  	if(copyErr){
  		if(copyErr.code=="ENOENT") consoleEx.log(FgRed,`Move file failed from ${original} errorCode: ${copyErr.code}`);		
  	}
  	else{
  		fs.unlink(original,err=>{
  			if(!err) consoleEx.log(FgGreen,`Move file succeeded to ${destination}`);
  		});	
  	}
  });
}

const get=(path,what)=>{
	const arr=path.split("\\");

	let value;
	switch(what){
		case "store":
			value=arr[arr.length-2];
			break;
		case "filename":
			value=arr[arr.length-1];
			break;
	}

	return value;
}

const getTarget=original=>{

	const filename=get(original,"filename");
	const ext=path.extname(filename);

	const basename=path.basename(filename,ext);
	let category,store=get(original,"store");


	if(/^crf|^eod/i.test(basename)){
		category="4. Sales";
	}

	else if(/^ddsr/i.test(basename)){
		category="2. Accounts Payables/5. DDSR";
	}

	else{
		category="0. Unfiled";
	}

	return path.join(data,category,store,basename+"_"+store+"_"+getISOTimeStamp(new Date)+ext);
}


consoleEx.log(FgCyan,`Start watching ${inbox}`);


chokidar.watch(inbox, {ignored: /^\./, persistent: true}).on("add", original=>{


	//console.log(original);
	move(original,getTarget(original));


}).on("change",original=>{

	move(original,getTarget(original));

});

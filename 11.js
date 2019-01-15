//const fetch=require("isomorphic-fetch");
const fetch=require("node-fetch");
const Dropbox = require("dropbox").Dropbox;
const dbx = new Dropbox({ accessToken: "dntVyL57BkAAAAAAAAAACz8oVc49RPD4goS0P1jrZAYLI3ZNmLYAXogTNRuEKP8S", fetch:fetch});
const fs= require("fs");
const chokidar = require("chokidar");
const path=require("path");
const url=require("url");

/*dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  });*/

/*dbx.filesListFolder({path: "/ipdi"})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
*/

const winToLinux=str=>{
	return str.replace(/\\/g,"/");
}

let i=0;

const count={
	success:0,
	error:0,
	retry:0,
	total:0
}

//const source="C:/Users/Liang/Desktop/IPDI";
//const source="e:/temp";
//const source="e:/project";
//const source="e:/php";
//const source="e:/beagle";
const source="e:/acc";


const isItDone=()=>{
	console.log(count);
	if(count.success+count.error==count.total) console.log("Backup completed");
}

const writeReg=/too_many_write_operations/;
const allowedReg=/path\/disallowed_name|path\/conflict\/file/;

const upload=(boxPath,contents,gap)=>{

	setTimeout(()=>{

		dbx.filesUpload({ path: boxPath, contents: contents }).then(res=>{
			count.success+=1;
			isItDone();

		}).catch(err=> {

			//console.log(err,err.hasOwnProperty("FetchError"),err.name);
			if(err.name=="FetchError"){
				count.retry+=1;
				setTimeout(()=>{upload(boxPath,contents);},200*count.retry);
				return;

			}

			const errMsg=err.error.error_summary;

			if(allowedReg.test(errMsg)) count.error+=1;
			else {
				count.retry+=1;
				setTimeout(()=>{upload(boxPath,contents);},200*count.retry);
			}

			isItDone();

		});

	},gap);


}

const data=[];

const watcher=chokidar.watch(source,{ignored: /(^|[\/\\])\../}).on("add", pa=>{

	fs.readFile(pa,(err,contents)=>{

		const boxPath=winToLinux(pa).replace(source,"");
		count.total+=1;

		//console.log(count);
		//console.log(boxPath);
		

		upload(boxPath,contents,200*count.total);


		

	});

});


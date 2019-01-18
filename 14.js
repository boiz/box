const BoxSDK = require("box-node-sdk");
const fs= require("fs");


const sdk = new BoxSDK({
	clientID: "1zvuq3tzi8qfr1w1cuq5fnh6utbff9n9",
	clientSecret: "B8KjL8cctrjmvoJmlV4iRksDLdnNPkV2"
});

const client = sdk.getBasicClient("PwnufoijNFMnlubOlaKBpY066zOUXXyj");
client.users.get(client.CURRENT_USER_ID).then(user => console.log("Hello", user.name, "!")).catch(err => console.log("Got an error!", err));
const stream = fs.createReadStream("C:/Users/Liang/Desktop/1.txt");


client.files.uploadFile("0", "1.txt", stream).then(fileObject => { 
		console.log(fileObject);
	}).catch(error => { 
		console.log(error.Error);
});





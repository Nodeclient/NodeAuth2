# NodeAuth2 (Sample-Project)
![npm-image]
![npm](https://img.shields.io/npm/dt/nodeauth2)

## Npm Dependencies
 express
 ejs
 body-parser
 daytime-service
 nodeauth2

## Installation
```bash
 git clone https://github.com/Nodeclient/NodeAuth2.git
 cd express-auth2-example
 npm install
 npm run start
```

## AuthGenerate (client.js)
```js
     process.env.TOKEN_LENGTH = "6";
     process.env.TOKEN_PREFIX = "🔑";
const na2 = require("nodeauth2");
const NodeAuth2 = new na2.default.Authentication(20);
      NodeAuth2.http = "http://127.0.0.1:3000/api/daytime"
/* GENERATE */
NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
  console.log("Token", t);
}); 
```

## Authentication Browser Url
> http://127.0.0.1:3000/login

![nodeAuth2 login](https://github.com/Nodeclient/NodeAuth2/raw/master/express-auth2-example/screen_images/login.PNG)
![nodeAuth2 check](https://github.com/Nodeclient/NodeAuth2/raw/master/express-auth2-example/screen_images/check.PNG)

   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

# NodeAuth2
![npm-image]
![npm](https://img.shields.io/npm/dt/nodeauth2)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

 (TSOTP) Time Services based simple one time password genaretor 
 
 ## na2 - token generation
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)


### About - na2
* Fully customizable (Token expiration time , prefix , length , services)
* Multiple (daytime,nist) service synchronization.
* Simple algorithm and fast token generation 
* OpenSource

 > Build            : Node.Js , Typescript, (es5,6)

 > Daytime Protocol : https://tools.ietf.org/html/rfc867

 
## Install 
```bash
 npm install nodeauth2 --save
```
```js
   /* 
    Expiration Time (Second) Types <number>
    Secret Code Types <string> 
    Code : (100 New Token),(101 Already Generated),(102 Expired)
  */
   process.env.TOKEN_LENGTH = "6"   // Token length [123456] Min(4) ~ Max(32)
   process.env.TOKEN_PREFIX = "-" // Custom prefix (-)
   process.env.TIME_SERVICE = "127.0.0.1 , time.example.com" // Daytime services list -> https://tf.nist.gov/tf-cgi/servers.cgi
    
 import * as na2 from "nodeauth2";
 const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time 20 sec
 
```
### Generate one time token
```js
NodeAuth2.AuthGenerate("this is your secret pass phrase").then(g => {
 console.log("Na2", g);
}); 
```

### Check one time token 
```js
NodeAuth2.AuthCheck("this is your secret pass phrase","123-456").then(g=>{
 console.log("Na2", g);
}) 
``` 


   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

# NodeAuth2
![npm-image]
![npm](https://img.shields.io/npm/dt/mira-db)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

 (DOTP) Time Services based simple one time password genaretor 
 
 ## na2 - token generation
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)


### What makes NodeAuth different?
* Fully customizable (Token expiration time , prefix , length , custom services)
* Multiple (daytime,nist) service synchronization.
* Simple algorithm and fast token generation 
* No dependencies other 3rd packages.

 > Code             : Node.Js , Typescript, (es5,6)

 > Daytime Protocol : https://tools.ietf.org/html/rfc867
 
 
## Install 
```bash
 npm install nodeauth2 --save
```
```js
     /* 
         Expiration Time (Second) Types <number>
         Secret Code Types <string> 
         Message : (100 New Token),(101 Already Generated),(102 Expired)
     */
    process.env.TOKEN_LENGTH = "6"   // Token length [123456] Min(4) ~ Max(32)
    process.env.TOKEN_PREFIX = "-" // Custom prefix (-)
    process.env.TIME_SERVICE = "127.0.0.1 , time.nist.gov , time.example.com" // Daytime services
    
 import * as na2 from "../lib/authentication";
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


   [npm-image]: https://img.shields.io/npm/v/mira-db.svg?style=flat 
   [npm-url]: https://npmjs.org/package/mira-db  

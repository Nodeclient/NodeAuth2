# NodeAuth2 (Alpha 1.0)
[![NPM version][npm-image]][npm-url]
![npm](https://img.shields.io/npm/dt/nodeauth2)
[![Try on RunKit](https://badge.runkitcdn.com/nodeauth2.svg)](https://runkit.com/nodeclient/nodeauth2/1.0.7)
[![License: LGPL v3](https://img.shields.io/badge/License-MIT-red.svg)](https://en.wikipedia.org/wiki/MIT_License)

 (TSOTP) Time Services based simple one-time password genaretor 
 
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)

### Features (na2)
* A fully customizable generation , you can change the expiration time , prefix , length or time services
* Supported two different way for synchronization : (http , tcp)
* Simple algorithm.
- ```TIME FORMAT : MJD YY-MM-DD HH:MM:SS MS UTC(NA2) *```


## Install 
```bash
 npm install nodeauth2 --save
```

### Auth (Sample-Http-Project)
> https://git.io/JfPx5

### Auth Token (checking & generation) 
```js
/* 
   STATUS MESSAGES
     AuthCheck      : (100 = time service success),(120 =  time service failed)
     AuthGenerate   : (100 =  New),(101 = Already Generated),(102 = Expired)
*/

/* NodeAuth2 DayTime Service (Npm Package) tcp,http support
    https://www.npmjs.com/package/daytime-service
*/ 

/* Nist DayTime Services 
    https://tf.nist.gov/tf-cgi/servers.cgi
*/ 

 process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)  | Type <number> 
 process.env.TOKEN_PREFIX = "-"; // Custom token prefix (-) (*) (🔑)  | Type <string> 
  const na2 = require("nodeauth2"); // NA2 Module
  const NodeAuth2 = new na2.default.Authentication(20); // Set new token expiration time (20 second) | Type <number>
```

### Set a time service (type: http or tcp)
```js
//HTTP = <SINGLE URL> (https,http)  | Type <string> 
NodeAuth2.http = "http://192.168.2.1:3000/your-rest-api/daytime"
```
```js
//TCP  = <MULTIPLE ADRESS> (ip,domain) | Type <string> 
NodeAuth2.tcp ="time.example.gov, time.example.com , 192.168.2.1" 
```

#### Generate one-time token
```js
/* GENERATE  (Return Type <Json.Object>) */ 
NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
  console.log("Na2", t);
}); 
```
### Output :
```bash
Na2 {
  token_prefix: '524-226',
  token_number: '524226',
  code: 100,
  expiration: '20s'
}
```

#### Check one-time token 
```js
/* CHECK  (Return Type <Json.Object>) */       
NodeAuth2.AuthCheck("this is your secret pass phrase","524226").then( t =>{
  console.log("Na2", t);
});
``` 
### Output :
```bash
Na2 {
  status: true,
  auth: '524226',
  code: 100,
  message: 'Authentication : Success'
}
```

 > Build            : Node.Js , Typescript, (es5,6)

   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

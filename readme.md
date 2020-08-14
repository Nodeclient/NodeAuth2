# NodeAuth2 (Alpha 1.0)
[![NPM version][npm-image]][npm-url]
![npm](https://img.shields.io/npm/dt/nodeauth2)
[![Try on RunKit](https://badge.runkitcdn.com/nodeauth2.svg)](https://runkit.com/nodeclient/nodeauth2/1.0.7)
[![License: LGPL v3](https://img.shields.io/badge/License-MIT-red.svg)](https://en.wikipedia.org/wiki/MIT_License)

 (TSOTP) Time Services based simple one-time password genaretor 
 
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)

### Features (na2)
* A fully customizable , can change the expiration time , prefix , token length or can use your own time service settings.
* Supports auth synchronization with (http or tcp) type a time service. "If service connection gonna be failing then (na2) synched with your local time" (code: 120)
* you can easy changed anything on this project because (na2) not using the otplib algorithm , unique and very simple a time service based open-source token generator.

## Install 
```bash
 npm install nodeauth2 --save
```

### Authentication (Sample-Http-Project)
> https://git.io/JfPx5

### Auth Token (checking & generating) 
```js
/* STATUS
    AuthCheck      : (100 = time service success , 120 =  time service failed)
    AuthGenerate   : (100 =  new token , 101 = already generated , 102 = token expired )
*/

/* TIME SERVICE (Npm Package)
  https://www.npmjs.com/package/daytime-service
  TIME FORMAT : MJD YY-MM-DD HH:MM:SS MS UTC(NA2) , also supports nist services
*/ 

 process.env.TOKEN_LENGTH = "6"; // Token length Min(4) ~ Max(32)  | Type <number> 
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

#### Generate function
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

#### Check function
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

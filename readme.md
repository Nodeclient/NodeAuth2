# NodeAuth2 (Alpha 1.0)
[![NPM version][npm-image]][npm-url]
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

 (TSOTP) Time Services based simple one time password genaretor 
 
### na2 - token generation
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)

### Features (na2)
* Fully customizable (Token expiration time , prefix , length , services)
* Support (http or tcp) service synchronization.
* Simple algorithm

## Install 
```bash
 npm install nodeauth2 --save
```

### Auth2 Http Check (Sample-Project)
> https://github.com/Nodeclient/NodeAuth2/tree/master/express-auth2-example

## Sample (es5) 
```js
/* 
    Expiration Time (Second) Types <number>
    SecretKey  Types <string> 
    Gen-Code : (100 New Token),(101 Already Generated),(102 Expired)
*/

/* NodeAuth2 DayTime Service (Npm Package) tcp,http support
    https://www.npmjs.com/package/daytime-service
*/ 

/* Nist DayTime Services 
    https://tf.nist.gov/tf-cgi/servers.cgi
*/ 

	process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)
	process.env.TOKEN_PREFIX = "-"; // Custom token prefix (-) (*) (🔑)
	  const na2 = require("nodeauth2"); // Import Auth2 Module
	  const NodeAuth2 = new na2.default.Authentication(20); // Set new token expiration time (20 second)
```

### Set a time service (type: http or tcp)
```js
//HTTP = <SINGLE URL> (https,http)
NodeAuth2.http = "http://192.168.2.1:3000/your-rest-api/daytime"
```
```js
//TCP  = <MULTIPLE ADRESS> (ip,domain)
NodeAuth2.tcp ="time.example.gov, time.example.com , 192.168.2.1"
```

#### Generate one-time token
```js
/* GENERATE */
NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
  console.log("Na2", t);
}); 
```
### Output :
```bash
Na2 {
  token_prefix: '524-226',
  token_number: '524226',
  message: 100,
  expiration: '20s'
}
```

#### Check one-time token 
```js
/* CHECK */       
NodeAuth2.AuthCheck("this is your secret pass phrase","524226").then( t =>{
  console.log("Na2", t);
});
``` 
### Output :
```bash
Na2 { status: true, auth: '524226', message: 'Authentication (100):Success' }

```

 > Build            : Node.Js , Typescript, (es5,6)

   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

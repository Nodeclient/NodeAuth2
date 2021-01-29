# NodeAuth2
[![NPM version][npm-image]][npm-url]
![npm](https://img.shields.io/npm/dt/nodeauth2)
[![Try on RunKit](https://badge.runkitcdn.com/nodeauth2.svg)](https://runkit.com/nodeclient/nodeauth2/1.0.7)
[![License: LGPL v3](https://img.shields.io/badge/License-MIT-red.svg)](https://en.wikipedia.org/wiki/MIT_License)

 (TSOTP) Time service based custom one-time token/password genaretor 
 
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)

* can use your own custom settings for a password or tokens generating like (expiration time , prefix and token length) 
* this package not using the HOTP/TOTP/OTP librarys
* Auth time format supports nist time services , text based or you can use the "daytime-service" npm package

/* NodeAuth2 Time Formatter (Npm Package)
    https://www.npmjs.com/package/daytime-service
*/ 

## Global
```bash
 npm install nodeauth2 -g
```

### Authentication (Sample-Http-Project)
> https://git.io/JfPx5

### Auth Token (checking & generating) 
```js
    /* 
        STATUS MESSAGES
            AuthCheck      : (100 = time service success),(120 =  time service failed)
            AuthGenerate   : (100 =  New),(101 = Already Generated),(102 = Expired)
    */

    process.env.TOKEN_LENGTH = "6"   // Token length Min(4) ~ Max(32) | <number> 
    process.env.TOKEN_PREFIX = "🔑"  // Custom prefix (-) (*) (🔑) | <string> 

    import * as na2 from "nodeauth2"; // NodeAuth2 Module
    const NodeAuth2 = new na2.default.Authentication(20); // Token Expiration Time (Second) | <number> 

    /*  AUTH DATA TYPES
        TIME  = <TIME FORMAT> (Text) | <string> 
        HTTP = <SINGLE URL> (https,http)  | <string> 
        TCP  = <MULTIPLE ADRESS> (ip,domain) | <string> 
    */


    // ** NIST TCP **
        NodeAuth2.tcp ="time.nist.gov, time.example.com , 192.168.2.1"
    // ** TEXT **
        NodeAuth2.time = "59243 21-01-21 11:12:13 404 UTC(NA2) *"
    // ** HTTP & HTTPS **
        NodeAuth2.http = "http://127.0.0.1:3000/api/daytime"
        NodeAuth2.http = "https://127.0.0.1:3000/api/daytime"


    /* GENERATE */
        NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
            console.log("First Test", t);
        }); 
    /* CHECK */       
        NodeAuth2.AuthCheck("this is your secret pass phrase","162359").then( t =>{
            console.log("First Test", t);
        });
```
### Output :
```bash
Na2 {
  token_prefix: '524🔑226',
  token_number: '524226',
  code: 100,
  expiration: '20s'
}
```

#### Check function
```js
/* CHECK  (Return Type <Json>) */       
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

> **Note:** 
`"If service connection gonna be failing then (na2) synched with your local time" (code: 120)`

> Build            : Node.Js , Typescript, (es5,6)

   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

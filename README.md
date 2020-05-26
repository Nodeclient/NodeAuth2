# NodeAuth2 (Alpha 1.0)
[![NPM version][npm-image]][npm-url]
[![License:mit](https://img.shields.io/badge/License-mit-blue.svg)](https://www.gnu.org/licenses/mit)

 (TSOTP) Time Services based simple one time password genaretor 
 
 ### na2 - token generation
![nodeAuth2](https://github.com/Nodeclient/NodeAuth2/raw/master/docs/images/flow.png)


### About - na2
* Fully customizable (Token expiration time , prefix , length , services)
* Multiple (daytime,nist) service synchronization.
* Simple algorithm and fast token generation 

 > Build            : Node.Js , Typescript, (es5,6)

 > Daytime Protocol : https://tools.ietf.org/html/rfc867

 
## Install 
```bash
 npm install nodeauth2 --save
```
## Sample Script 
```js
   /* 
    Expiration Time (Second) Types <number>
    Secret Code Types <string> 
    Code : (100 New Token),(101 Already Generated),(102 Expired)
  */
   process.env.TOKEN_LENGTH = "6"   // Token length [123456] Min(4) ~ Max(32)
   process.env.TOKEN_PREFIX = "-" // Custom token prefix (-) (*) (🔑)
   process.env.TIME_SERVICE = "127.0.0.1 , time.example.com" //daytime services list -> https://tf.nist.gov/tf-cgi/servers.cgi

  const na2 = require('nodeauth2');
  const NodeAuth2 = new na2.default.Authentication(20); // Token Expiration Time 20 sec
```

#### Generate one time token
```js
NodeAuth2.AuthGenerate("this is your secret pass phrase").then(t => {
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

#### Check one time token 
```js
NodeAuth2.AuthCheck("this is your secret pass phrase","524226").then(t=>{
 console.log("Na2", t);
}) 
``` 
### Output :
```bash
Na2 { status: true, auth: '524226', message: 'Authentication :Success' }
```

   [npm-image]: https://img.shields.io/npm/v/nodeauth2.svg?style=flat 
   [npm-url]: https://npmjs.org/package/nodeauth2 

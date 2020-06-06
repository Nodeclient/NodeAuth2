"use strict";
/*
    STATUS MESSAGES
        AuthCheck      : (100 = time service success),(120 =  time service failed)
        AuthGenerate   : (100 =  New),(101 = Already Generated),(102 = Expired)
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* STATUS
  AuthCheck      : (100 = time service success),(120 =  time service failed)
  AuthGenerate   : (100 =  New),(101 = Already Generated),(102 = Expired)
*/
/* TIME SERVICE (Npm Package)
  https://www.npmjs.com/package/daytime-service
  TIME FORMAT : MJD YY-MM-DD HH:MM:SS MS UTC(NA2) , also supports nist services
*/ 
process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32) | <number> 
process.env.TOKEN_PREFIX = "🔑"; // Custom token prefix (-) (*) (🔑) | <string> 
const na2 = require("../lib/authentication"); // NA2 Module
const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time 20 sec | <number> 
/* SET TIME SERVICE
    HTTP = <SINGLE URL> (https,http)  | <string>
    TCP  = <MULTIPLE ADRESS> (ip,domain) | <string>
*/
NodeAuth2.http = "http://127.0.0.1:3000/api/daytime";
//NodeAuth2.tcp ="time.nist.gov, time.example.com , 192.168.2.1"
/* GENERATE */
NodeAuth2.AuthGenerate("this is your secret pass phrase").then(t => {
    console.log("na2", t);
});
/* CHECK */
// NodeAuth2.AuthCheck("this is your secret pass phrase","162359").then( t =>{
//     console.log("Na2", t);
// });

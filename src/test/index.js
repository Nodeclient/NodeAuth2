"use strict";
/*
    STATUS MESSAGES
        AuthCheck      : (100 = time service success),(120 =  time service failed)
        AuthGenerate   : (100 =  New),(101 = Already Generated),(102 = Expired)
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* NodeAuth2 Time Service (Npm Package)
    https://www.npmjs.com/package/daytime-service
*/
process.env.TOKEN_LENGTH = "6"; // Token length Min(4) ~ Max(32) | <number> 
process.env.TOKEN_PREFIX = "🔑"; // Custom prefix (-) (*) (🔑) | <string> 
const na2 = require("../lib/authentication"); // NodeAuth2 Module
const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time (Second) | <number> 
/*  AUTH DATA TYPES
    TIME  = <TIME FORMAT> (Text) | <string>
    HTTP = <SINGLE URL> (https,http)  | <string>
    TCP  = <MULTIPLE ADRESS> (ip,domain) | <string>
*/
// ** NIST TCP SERVER **
// NodeAuth2.tcp ="time.nist.gov, time.example.com , 192.168.2.1"
// ** HTTP & HTTPS SERVER **
NodeAuth2.http = "http://127.0.0.1:3000/api/daytime";
// NodeAuth2.http = "https://127.0.0.1:3000/api/daytime"
// ** TIME STRING **
// NodeAuth2.time = "59243 21-01-29 11:15:31 291 UTC(NA2) *"
/* GENERATE */
NodeAuth2.AuthGenerate("this is your secret pass phrase").then(t => {
    console.log("First Test", t);
});
/* CHECK */
// NodeAuth2.AuthCheck("this is your secret pass phrase","162359").then( t =>{
//     console.log("First Test", t);
// });

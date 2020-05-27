"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Expiration Time (Second) Types <number>
    Secret Code Types <string>
    Message : (100 New Token),(101 Already Generated),(102 Expired)
*/
process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)
process.env.TOKEN_PREFIX = "-"; // Custom token prefix (-) (*) (🔑)
//process.env.TIME_SERVICE = "192.168.1.10 , time.ntist.gov"; // daytime services -> https://tf.nist.gov/tf-cgi/servers.cgi
const na2 = require("../lib/authentication"); // Import NA2 Module
const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time 20 sec
/* GENERATE  */
// NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
//     console.log("Na2", t);
// }); 
/* CHECK */
// NodeAuth2.AuthCheck("this is your secret pass phrase","459544").then( t =>{
//         console.log("Na2", t);
// });

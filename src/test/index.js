"use strict";
/*
    Expiration Time (Second) Types <number>
    SecretKey  Types <string>
    Gen-Code : (100 New Token),(101 Already Generated),(102 Expired)
*/
Object.defineProperty(exports, "__esModule", { value: true });
/* NodeAuth2 Time Service (Npm Package)
    https://www.npmjs.com/package/daytime-service
*/
/* Nist DayTime Services
    https://tf.nist.gov/tf-cgi/servers.cgi
*/
process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)
process.env.TOKEN_PREFIX = "-"; // Custom token prefix (-) (*) (🔑)
const na2 = require("../lib/authentication"); // Import NA2 Module
const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time 20 sec
/* SET TIME SERVICE
    HTTP = <SINGLE URL> (https,http)
    TCP  = <MULTIPLE ADRESS> (ip,domain)
*/
NodeAuth2.http = "http://192.168.2.38:3000/api/daytime";
//NodeAuth2.tcp ="time.nist.gov, time.example.com , 192.168.2.1"

/* GENERATE */
    NodeAuth2.AuthGenerate("this is your secret pass phrase").then(t => {
        console.log("Na2", t);
    });

/* CHECK */
    // NodeAuth2.AuthCheck("this is your secret pass phrase","614296").then( t =>{
    //     console.log("Na2", t);
    // });


/*  Sample Auth2 Project 
    https://github.com/Nodeclient/NodeAuth2/tree/master/express-auth2-example
*/
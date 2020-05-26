"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Expiration Time (Second) Types <number>
    Secret Code Types <string>
    Code : (100 New Token),(101 Already Generated),(102 Expired)
*/
process.env.TOKEN_LENGTH = "6"; // Token length [123456] Min(4) ~ Max(32)
process.env.TOKEN_PREFIX = "-"; // Custom prefix (-)
process.env.TIME_SERVICE = "127.0.0.1 , time.nist.gov";
const na2 = __importStar(require("../lib/authentication"));
const NodeAuth2 = new na2.Authentication(20); // Token Expiration Time 20 sec
/*
    NodeAuth2.AuthCheck("this is your secret pass phrase","123-456").then(g=>{
        console.log("Na2", g);
    })

    NodeAuth2.AuthGenerate("this is your secret pass phrase").then(g => {
        console.log("Na2", g);
    });
*/

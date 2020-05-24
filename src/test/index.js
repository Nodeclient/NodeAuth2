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
    Expire Time (Second) Types <number>
    Secret Code Types <string>
*/

    process.env.TOKEN_LENGTH = "6";
    process.env.TOKEN_PREFIX = "(your.com)";
    const na = __importStar(require("../lib/authentication"));
    const NodeAuth = new na.Authentication(25);// Token Expire 25 second

    NodeAuth.AuthToken("this is my very secret phase").then(g => {
        console.log("NodeAuth.generate", g);
    });

/*  
    NodeAuth.Check("this is my very secret phase","242950").then(g=>{
        console.log("NodeAuth.check", g);
    })

*/

    process.env.TOKEN_LENGTH = "6";
     process.env.TOKEN_PREFIX = "🔑";
const na2 = require("nodeauth2");
const NodeAuth2 = new na2.default.Authentication(20);
      NodeAuth2.http = "http://127.0.0.1:3000/api/daytime"
/* GENERATE */
NodeAuth2.AuthGenerate("this is your secret pass phrase").then( t => {
  console.log("Token", t);
}); 

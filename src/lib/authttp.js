"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUltility = void 0;
const http = require("http");
const https = require("https");
const url = require("url");
class HttpUltility {
    constructor(Http_Url) {
        this.requrl = Http_Url;
    }
    GetUri(callback) {
        const ap = String(url.parse(this.requrl).protocol) || "http:";
        switch (ap) {
            case "https:":
                https.get(this.requrl, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    resp.on('end', () => {
                        callback(data);
                    });
                }).on("error", (err) => {
                    callback(false);
                });
                break;
            case "http:":
                http.get(this.requrl, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    resp.on('end', () => {
                        callback(data);
                    });
                }).on("error", (err) => {
                    callback(false);
                });
                break;
        }
    }
}
exports.HttpUltility = HttpUltility;

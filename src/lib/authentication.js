"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const ad = require("./authtz");
const al = require("./authalgorit");
class Authentication {
    constructor(Expiration) {
        this.ExTime = Expiration;
        this.AuthMap = new Map();
        this.conn_type = "tcp";
        this.conn_adress = "0.0.0.0";
    }
    set http(cLink) {
        this.conn_type = "http";
        this.conn_adress = cLink;
    }
    set tcp(cLink) {
        this.conn_type = "tcp";
        this.conn_adress = cLink;
    }
    AuthCheck(SecretKey, Token) {
        const AuthNumber = (Token = String(Token).replace(/\D/g, '')) || 0x0;
        const _arr = [];
        const auTZ = new ad.AuthTimeZones;
        auTZ.SET_PING_TIME_OUT = 0x12c;
        auTZ.SET_CONNECTION = {
            type: this.conn_type,
            service: this.conn_adress
        };
        return new Promise((res) => {
            auTZ.Network((ID, TZ_TIME) => {
                auTZ.SET__TZ = TZ_TIME;
                let _g = parseInt(TZ_TIME);
                for (let i = Number(0); i < Number(this.ExTime) + 1; i++) {
                    _arr.push(new al.AuthCrypt(SecretKey, _g).AuthGen.Number);
                    _g += 1;
                }
                let authStatus = _arr.indexOf(AuthNumber) >= 0x0 ? true : false;
                res({
                    status: authStatus,
                    auth: AuthNumber,
                    code: ID,
                    message: "Authentication : " + (authStatus == true ? "Success" : "Failed")
                });
            });
        });
    }
    AuthGenerate(SecretKey) {
        const auTZ = new ad.AuthTimeZones;
        auTZ.SET_PING_TIME_OUT = 0x12c;
        auTZ.SET_CONNECTION = {
            type: this.conn_type,
            service: this.conn_adress
        };
        return new Promise((auRes) => {
            auTZ.Network((ID, TZ_TIME) => {
                const _g = parseInt(TZ_TIME) + this.ExTime;
                const newACT = new al.AuthCrypt(SecretKey, _g);
                const TimeLeft = _g - parseInt(TZ_TIME);
                auRes({
                    token_prefix: newACT.AuthGen.Prefix,
                    token_number: newACT.AuthGen.Number,
                    code: ID,
                    expiration: TimeLeft + "s"
                });
            });
        });
    }
}
exports.Authentication = Authentication;

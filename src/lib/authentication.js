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
        this.conn_adress = "127.0.0.1";
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
        auTZ.SET_CONNECTION = { type: this.conn_type, service: this.conn_adress };
        return new Promise((res) => {
            let CALL_PING = (ID, TZ_TIME) => {
                auTZ.SET__TZ = TZ_TIME;
                if (!this.AuthMap.get(SecretKey) || false) {
                    let _g = parseInt(TZ_TIME);
                    for (let i = Number(0); i < Number(this.ExTime) + 1; i++) {
                        _arr.push(new al.AuthCrypt(SecretKey, _g).AuthGen.Number);
                        _g += 1;
                        if (Number(this.ExTime) == i)
                            this.AuthMap.set(SecretKey, _g);
                    }
                }
                else if (this.AuthMap.get(SecretKey) <= TZ_TIME) {
                    let _g = parseInt(TZ_TIME);
                    for (let i = Number(0); i < Number(this.ExTime) + 1; i++) {
                        _arr.push(new al.AuthCrypt(SecretKey, _g).AuthGen.Number);
                        _g += 1;
                        if (Number(this.ExTime) == i)
                            this.AuthMap.set(SecretKey, _g);
                    }
                }
                else {
                    let _g = this.AuthMap.get(SecretKey) || 0;
                    for (let i = Number(0); i < Number(this.ExTime) + 1; i++) {
                        _arr.push(new al.AuthCrypt(SecretKey, _g).AuthGen.Number);
                        _g += 1;
                    }
                }
                let authStatus = _arr.indexOf(AuthNumber) >= 0x0 ? true : false;
                res({
                    status: authStatus,
                    auth: AuthNumber,
                    message: "Authentication :" + (authStatus == true ? "Success" : "Failed")
                });
            };
            typeof this.AuthMap.get(SecretKey) == "undefined" ? auTZ.Network(CALL_PING) : CALL_PING(0, this.AuthMap.get(SecretKey));
        });
    }
    AuthGenerate(SecretKey) {
        const auTZ = new ad.AuthTimeZones;
        auTZ.SET_PING_TIME_OUT = 0x12c;
        auTZ.SET_CONNECTION = { type: this.conn_type, service: this.conn_adress };
        return new Promise((auRes) => {
            let CALL_AUTH = (ID, TZ_TIME) => {
                if (!this.AuthMap.get(SecretKey) || false) {
                    const _g = parseInt(TZ_TIME) + this.ExTime;
                    const newACT = new al.AuthCrypt(SecretKey, _g);
                    this.AuthMap.set(SecretKey, _g);
                    const TimeLeft = parseInt(this.AuthMap.get(SecretKey)) - parseInt(TZ_TIME);
                    auRes({
                        token_prefix: newACT.AuthGen.Prefix,
                        token_number: newACT.AuthGen.Number,
                        message: 100,
                        expiration: TimeLeft + "s"
                    });
                }
                else if (this.AuthMap.get(SecretKey) <= TZ_TIME) {
                    const _g = parseInt(TZ_TIME) + this.ExTime;
                    const newACT = new al.AuthCrypt(SecretKey, _g);
                    this.AuthMap.set(SecretKey, _g);
                    auRes({
                        token_prefix: newACT.AuthGen.Prefix,
                        token_number: newACT.AuthGen.Number,
                        message: 102,
                        expiration: this.ExTime + "s"
                    });
                }
                else {
                    const newACT = new al.AuthCrypt(SecretKey, this.AuthMap.get(SecretKey));
                    auRes({
                        token_prefix: newACT.AuthGen.Prefix,
                        token_number: newACT.AuthGen.Number,
                        message: 101,
                        expiration: this.ExTime + "s"
                    });
                }
            };
            typeof this.AuthMap.get(SecretKey) == "undefined" ? auTZ.Network(CALL_AUTH) : CALL_AUTH(0, this.AuthMap.get(SecretKey));
        });
    }
}
exports.Authentication = Authentication;

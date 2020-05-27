"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSync = void 0;
const _f = require("fs");
const _p = require("path");
class AuthFsType {
    get Type() {
        return {
            file: "auth.sync",
            temp: "./cache"
        };
    }
}
class AuthSync {
    constructor() {
        this.toskey;
    }
    Register(tosHash) {
        const fst = new AuthFsType;
        let ToStore = {
            key: tosHash
        };
        try {
            _f.exists(_p.join(fst.Type.temp), function (m) {
                if (m) {
                    _f.writeFileSync(_p.join(fst.Type.temp, fst.Type.file), JSON.stringify(ToStore));
                    return true;
                }
                else {
                    _f.mkdirSync(_p.join(fst.Type.temp));
                    _f.writeFileSync(_p.join(fst.Type.temp, fst.Type.file), JSON.stringify(ToStore));
                    return true;
                }
            });
        }
        catch (error) {
            return false;
        }
    }
    Default() {
        const fst = new AuthFsType;
        try {
            if (!this.toskey) {
                this.toskey = String(_f.readFileSync(_p.join(fst.Type.temp, fst.Type.file)));
            }
            return JSON.parse(this.toskey);
        }
        catch (error) {
            return false;
        }
    }
}
exports.AuthSync = AuthSync;

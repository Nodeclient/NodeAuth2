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
exports.AuthSync = void 0;
const _f = __importStar(require("fs"));
const _p = __importStar(require("path"));
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

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
exports.AutZlib = exports.AuthCrypt = void 0;
const zlib = __importStar(require("zlib"));
const crypto = __importStar(require("crypto"));
class AutHash {
    constructor(StringOrigin) {
        this.Origin = StringOrigin;
    }
    get data() {
        return String(crypto.createHash('MD5').update(this.Origin).digest("hex")).toLowerCase();
    }
    get ldb() {
        return {
            "a": 1,
            "b": 2,
            "c": 3,
            "d": 4,
            "e": 5,
            "f": 6,
            "g": 7,
            "h": 8,
            "i": 9,
            "j": 0,
            "@": 1,
            "l": 2,
            "m": 3,
            "p": 4,
            "s": 1,
            "t": 2,
            "u": 3,
            "v": 4,
            "w": 5,
            "x": 6,
            "y": 7,
            "z": 8,
            "1": 9,
            "2": 0,
            " ": 1,
            "4": 2,
            "n": 3,
            "o": 4,
            "5": 1,
            "6": 2,
            "7": 3,
            "8": 4,
            "9": 5,
            "0": 6,
            "q": 7,
            "r": 8,
            "3": 9,
            "k": 0,
            "_": 1,
            "=": 2,
            ".": 3,
            "-": 4
        };
    }
}
class AuthSetting {
    constructor() {
        this.pr = String(process.env.TOKEN_PREFIX || "-");
        this.ml = Number(process.env.TOKEN_LENGTH || 7);
    }
    set setPrefix(prefixChar) {
        this.pr = prefixChar;
    }
    set setLength(Maxlength) {
        this.ml = Maxlength;
    }
    get getPrefix() {
        return this.pr;
    }
    get getLength() {
        return this.ml;
    }
}
class AuthCrypt extends AuthSetting {
    constructor(Secret, TimeStamp) {
        super();
        this.sk = Secret;
        this.ts = TimeStamp;
    }
    get AuthGen() {
        const txc = String(this.ts).concat(this.sk);
        let _m = new AutHash(txc);
        let _h = [];
        for (const e in _m.data) {
            _h.push(_m.ldb[_m.data[e]]);
        }
        const gn = _h.join("");
        const px = String(gn).substring(0, 3).concat(this.getPrefix).concat(String(gn).substring(3, this.getLength));
        const nb = String(gn).substring(0, this.getLength);
        return {
            Number: nb,
            Prefix: px
        };
    }
}
exports.AuthCrypt = AuthCrypt;
class AutZlib {
    constructor(Origin) {
        this.encodetype = Origin || 'base64';
    }
    Zobject(input) {
        return zlib.deflateSync(input).toString(this.encodetype);
    }
    unZobject(input) {
        return eval(zlib.inflateSync(Buffer.from(input, this.encodetype)).toString());
    }
}
exports.AutZlib = AutZlib;

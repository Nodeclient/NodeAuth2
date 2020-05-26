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
    get cdb() {
        return {
            "a": 0x1,
            "b": 0x2,
            "c": 0x3,
            "d": 0x4,
            "e": 0x5,
            "f": 0x6,
            "g": 0x7,
            "h": 0x8,
            "i": 0x9,
            "j": 0x0,
            "@": 0x1,
            "l": 0x2,
            "m": 0x3,
            "p": 0x4,
            "s": 0x1,
            "t": 0x2,
            "u": 0x3,
            "v": 0x4,
            "w": 0x5,
            "x": 0x6,
            "y": 0x7,
            "z": 0x8,
            "1": 0x9,
            "2": 0x0,
            " ": 0x1,
            "4": 0x2,
            "n": 0x3,
            "o": 0x4,
            "5": 0x1,
            "6": 0x2,
            "7": 0x3,
            "8": 0x4,
            "9": 0x5,
            "0": 0x6,
            "q": 0x7,
            "r": 0x8,
            "3": 0x9,
            "k": 0x0,
            "_": 0x1,
            "=": 0x2,
            ".": 0x3,
            "-": 0x4
        };
    }
}
class AuthSetting {
    constructor() {
        this.ns = String(process.env.TIME_SERVICE || 'time.nist.gov');
        this.pr = String(process.env.TOKEN_PREFIX || "-");
        this.ml = Number(process.env.TOKEN_LENGTH || 0x7) >= 0x4 ? Number(process.env.TOKEN_LENGTH) : 0x4;
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
            _h.push(_m.cdb[_m.data[e]]);
        }
        const gn = _h.join("");
        const px = String(gn).substring(0, 0x3).concat(this.getPrefix).concat(String(gn).substring(0x3, this.getLength));
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

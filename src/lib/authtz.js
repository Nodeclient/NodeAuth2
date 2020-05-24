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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTimeZones = void 0;
const net = __importStar(require("net"));
const al = __importStar(require("./authalgorit"));
class PSTYPE {
    constructor(str) {
        this.status = str;
        this.message = "local";
    }
    get GET_PING_MSG() {
        return this.message;
    }
    set SET_PING_MSG(str) {
        this.message = str;
    }
    get GET_PING_SID() {
        return this.status;
    }
    set SET_PING_SID(str) {
        this.status = str;
    }
}
class AuthTimeZones {
    constructor() {
        this.tmo = 1000;
        this.maxLength = 10;
    }
    set SET_PING_TIME_OUT(setNewtime) {
        this.tmo = setNewtime >= 500 ? setNewtime : 500;
    }
    Network(call) {
        return __awaiter(this, void 0, void 0, function* () {
            const localtime = new Date().valueOf();
            let _z = new al.AutZlib("hex");
            const PLS = _z.unZobject("789c8b562ac9cc4dd5cbcb2c2ed14bcf2f53d201f375137593b088a5238b959618ea82f526e7e7e41725a6e4eba5a69442c5cbcbcb104a6301b464222f");
            let PST = yield new PSTYPE("100");
            let Checking = 0;
            let NetworkPing = setInterval(() => {
                const client = new net.Socket();
                client.connect(13, PLS[Checking]);
                if (PST.GET_PING_SID == "100") {
                    client.on('data', function (data) {
                        let d = String(data).match(/\d+/g);
                        const UTCL = new Date();
                        let UTCR = String(UTCL.getFullYear()).concat("-").concat(d[2]).concat("-").concat(d[3]).concat("T").concat(d[4]).concat(":").concat(d[5]).concat(":").concat(d[6]);
                        const UTCB = new Date(UTCR).valueOf();
                        PST.SET_PING_SID = "1";
                        clearInterval(NetworkPing);
                        call(100, String(UTCB).length >= 10 ? String(UTCB).slice(0, 10) : localtime);
                        client.destroy();
                    }).on('error', function (e) {
                        Checking > PLS.length ? PST.SET_PING_SID = "120" : PST.SET_PING_SID = "100";
                        Checking++;
                    });
                }
                else if (PST.GET_PING_SID == "120") {
                    clearInterval(NetworkPing);
                    call(120, String(localtime).slice(0, 10));
                }
            }, this.tmo);
        });
    }
}
exports.AuthTimeZones = AuthTimeZones;

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
        this.tmo = 0x1f4;
        this.tzc = 0x0;
    }
    set SET__TZ(z) {
        this.tzc = z >= 0x0 ? z : 0x0;
    }
    get GET__TZ() {
        return this.tzc;
    }
    set SET_PING_TIME_OUT(setNewtime) {
        this.tmo = setNewtime >= 0x1f4 ? setNewtime : 0x1f4;
    }
    Network(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let isTry = false;
            const ping = new net.Socket();
            const localtime = new Date().valueOf();
            const Synchronize = (process.env.TIME_SERVICE) ? Array.isArray(String(process.env.TIME_SERVICE).split(",")) ? String(process.env.TIME_SERVICE).replace(/\s/g, "").split(",") : ["127.0.0.1"] : ["127.0.0.1"];
            let PST = yield new PSTYPE(0x64);
            let Checking = 0, waitOut = 0, repOut = 0;
            let nSync = setInterval(() => {
                (isTry) ? PST.SET_PING_SID = 0x82 : ping.connect(0xd, Synchronize[Checking]);
                if (PST.GET_PING_SID == 0x64) {
                    (repOut > Synchronize.length - 1) ? PST.SET_PING_SID = 0x78 : repOut++;
                    ping.on('data', function (data) {
                        isTry = true;
                        clearInterval(nSync);
                        ping.destroy();
                        let d = String(data).match(/\d+/g);
                        const UTCR = String(new Date().getFullYear()).concat("-").concat(d[0x2]).concat("-").concat(d[0x3]).concat("T").concat(d[0x4]).concat(":").concat(d[0x5]).concat(":").concat(d[0x6]).concat("Z");
                        const UTCB = new Date(UTCR);
                        call(100, (String(UTCB.getTime()).length >= 0xa) ? String(UTCB.getTime()).slice(0x0, 0xa) : localtime);
                    }).on('error', function (e) {
                        isTry = false;
                        (Checking > Synchronize.length - 1) ? PST.SET_PING_SID = 0x78 : PST.SET_PING_SID = 0x64;
                        if (Checking < Synchronize.length - 1)
                            Checking++;
                    });
                }
                else if (PST.GET_PING_SID == 0x82) {
                    if (waitOut >= 0x2) {
                        isTry = false;
                        PST.SET_PING_SID = 0x64;
                    }
                    else {
                        waitOut++;
                    }
                }
                else if (PST.GET_PING_SID == 0x78) {
                    Checking = 0;
                    repOut = 0;
                    clearInterval(nSync);
                    call(120, String(localtime).slice(0x0, 0xa));
                }
            }, this.tmo);
        });
    }
}
exports.AuthTimeZones = AuthTimeZones;

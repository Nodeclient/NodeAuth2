interface ctype {
    type: string;
    service: string;
}
export declare class AuthTimeZones {
    private tmo;
    private tzc;
    private stype;
    constructor();
    set SET__TZ(z: number);
    get GET__TZ(): number;
    set SET_CONNECTION(obj: ctype);
    get GET_CONNECTION(): ctype;
    set SET_PING_TIME_OUT(setNewtime: any);
    Network(call: any): Promise<void>;
}
export {};

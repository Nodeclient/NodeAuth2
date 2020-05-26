export declare class AuthTimeZones {
    private tmo;
    private tzc;
    constructor();
    set SET__TZ(z: number);
    get GET__TZ(): number;
    set SET_PING_TIME_OUT(setNewtime: number);
    Network(call: any): Promise<void>;
}

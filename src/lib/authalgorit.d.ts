interface GenParams {
    Number: any;
    Prefix: any;
}
declare class AuthSetting {
    private pr;
    private ml;
    constructor();
    set setPrefix(prefixChar: string);
    set setLength(Maxlength: number);
    get getPrefix(): string;
    get getLength(): number;
}
export declare class AuthCrypt extends AuthSetting {
    private sk;
    private ts;
    constructor(Secret: string, TimeStamp: number);
    get AuthGen(): GenParams;
}
export declare class AutZlib {
    private encodetype;
    constructor(Origin: any);
    Zobject(input: string): string;
    unZobject(input: string): any;
}
export {};

export declare class Authentication {
    private ExTime;
    private conn_type;
    private conn_adress;
    private AuthMap;
    constructor(Expiration: number);
    set http(cLink: string);
    set tcp(cLink: string);
    AuthCheck(SecretKey: string, Token: string): Promise<unknown>;
    AuthGenerate(SecretKey: string): Promise<unknown>;
}

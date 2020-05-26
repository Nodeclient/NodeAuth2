export declare class Authentication {
    private ExTime;
    private AuthMap;
    constructor(Expiration: number);
    AuthCheck(SecretKey: string, Token: string): Promise<unknown>;
    AuthGenerate(SecretKey: string): Promise<unknown>;
}

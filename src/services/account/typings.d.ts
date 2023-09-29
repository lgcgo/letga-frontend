// @ts-ignore
/* eslint-disable */

declare namespace API {
    type SigninParams = {
        passport?: string;
        password?: string;
        captcha?: boolean;
        role?: string;
        type?: string;
    };
    type SigninResult = {
        accessToken?: string;
        tokenType?: string;
        expiresIn?: string;
        refreshToken?: string;
    };
    type AccountInfo = {
        uuid?: string;
        account?: string;
        nickname?: string;
        avatar?: string;
        mobile?: string;
        email?: string;
        signinRole?: string;
        loginfailure?: number;
        loginip?: string;
        status?: string;
        lastLoginAt?: string;
        createAt?: string;
        updateAt?: string;
    };
}
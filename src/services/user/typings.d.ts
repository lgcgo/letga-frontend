// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserParams = {
    avatar?: string;
    account?: string;
    nickname?: string;
    mobile?: string;
    email?: string;
  };
  
  type User = {
    key: string;
    uuid?: string;
    avatar?: string;
    account?: string;
    nickname?: string;
    mobile?: string;
    email?: string;
    signinFailure?: number;
    signinRole?: string;
    signinIp?: string;
    signinAt?: string;
    status: string;
    createAt?: string;
    updateAt?: string;
  };

  type UserPage = PageResult<User>
}
// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/account/signin */
export async function signin(body: API.SigninParams, options?: Record<string, any>) {
    return request<API.SigninResult>('/api/account/signin', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 退出登录接口 POST /api/account/signout */
export async function signout(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/account/signout', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 获取登录用户信息 GET /api/account/info */
export async function currentUser(options?: Record<string, any>) {
    return request<API.AccountInfo>('/api/account/info', {
      method: 'GET',
      ...(options || {}),
    });
}
  
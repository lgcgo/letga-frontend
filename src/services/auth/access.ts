// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建授权 POST /admin/auth/access/setup */
export async function setup(params: API.AuthAccessSetupParam, options?: Record<string, any>) {
  return request<API.AuthAccess>('/admin/auth/access/setup', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 获取授权 GET /admin/auth/access */
export async function get(options?: Record<string, any>) {
  return request<API.AuthAccess>('/admin/auth/access', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改授权 PUT /admin/auth/access */
export async function update(data: API.AuthAccess, options?: Record<string, any>) {
  return request<API.AuthAccess>('/admin/auth/access', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 设置授权状态 PUT /admin/auth/access/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.AuthAccess>('/admin/auth/access/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除授权 DELETE /admin/auth/access */
export async function remove(keys: string[] | unknown, options?: Record<string, any>) {
  return request<{}>('/admin/auth/access', {
    method: 'DELETE',
    data: {
      keys: keys
    },
    ...(options || {}),
  });
}

/** 获取授权列表 GET /admin/auth/accesss */
export async function getPage(
  params: API.AuthAccessPageParams,
  options?: Record<string, any>,
) {
  return request<API.AuthAccessPage>('/admin/auth/accesses', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
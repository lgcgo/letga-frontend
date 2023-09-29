// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户 GET /admin/user */
export async function get(options?: Record<string, any>) {
  return request<API.User>('/admin/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建用户 POST /admin/user */
export async function create(data: API.UserParams, options?: Record<string, any>) {
  return request<API.User>('/admin/user', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 修改用户 PUT /admin/user */
export async function update(data: API.User, options?: Record<string, any>) {
  return request<API.User>('/admin/user', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin/user */
export async function remove(keys: string[] | unknown, options?: Record<string, any>) {
  return request<{}>('/admin/user', {
    method: 'DELETE',
    data: {
      keys: keys
    },
    ...(options || {}),
  });
}

/** 设置用户状态 PUT /admin/user/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.User>('/admin/user/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 获取用户列表 GET /admin/users */
export async function getPage(
  params: API.PageParams,
  options?: Record<string, any>,
) {
  return request<API.UserPage>('/admin/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

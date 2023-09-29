// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建路由 POST /admin/auth/route */
export async function create(data: API.AuthRoute, options?: Record<string, any>) {
  return request<API.AuthRoute>('/admin/auth/route', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 获取路由 GET /admin/auth/route */
export async function get(options?: Record<string, any>) {
  return request<API.AuthRoute>('/admin/auth/route', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改路由 PUT /admin/auth/route */
export async function update(data: API.AuthRoute, options?: Record<string, any>) {
  return request<API.AuthRoute>('/admin/auth/route', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 设置路由状态 PUT /admin/auth/route/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.AuthRoute>('/admin/auth/route/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除路由 DELETE /admin/auth/route */
export async function remove(keys: string[] | unknown, options?: Record<string, any>) {
  return request<{}>('/admin/auth/route', {
    method: 'DELETE',
    data: {
      keys: keys
    },
    ...(options || {}),
  });
}

/** 获取路由列表 GET /admin/auth/routes */
export async function getPage(
  params: API.PageParams,
  options?: Record<string, any>,
) {
  return request<API.AuthRoutePage>('/admin/auth/routes', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
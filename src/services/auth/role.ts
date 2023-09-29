// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取角色树 GET /admin/auth/role/tree */
export async function getTree(params: API.TreeParams ,options?: Record<string, any>) {
  return request<API.AuthRoleTree>('/admin/auth/role/tree', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取角色过滤树 GET /admin/auth/role/flitertree */
export async function getFliterTree(params: API.TreeParams, options?: Record<string, any>) {
  return request<API.FliterTreeResult>('/admin/auth/role/flitertree', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建角色 POST /admin/auth/role */
export async function create(data: API.AuthRoleCreate, options?: Record<string, any>) {
  return request<API.AuthRole>('/admin/auth/role', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 获取角色 GET /admin/auth/role */
export async function get(options?: Record<string, any>) {
  return request<API.AuthRole>('/admin/auth/role', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改角色 PUT /admin/auth/role */
export async function update(data: API.AuthRoleUpdate, options?: Record<string, any>) {
  return request<API.AuthRole>('/admin/auth/role', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 设置路由状态 PUT /admin/auth/role/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.AuthRole>('/admin/auth/role/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /admin/auth/role */
export async function remove(keys: string[] | unknown, options?: Record<string, any>) {
  return request<{}>('/admin/auth/role', {
    method: 'DELETE',
    data: {
      keys: keys
    },
    ...(options || {}),
  });
}

/** 获取路由选择分页 GET /admin/auth/role/accesses */
export async function getAccessPage(
  params: API.PageParams,
  options?: Record<string, any>,
) {
  return request<API.AuthRoleAccessPage>('/admin/auth/role/accesses', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

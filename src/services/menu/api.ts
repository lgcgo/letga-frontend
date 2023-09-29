// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取菜单树集 GET /admin/menu/tree */
export async function getTree(params: API.TreeParams ,options?: Record<string, any>) {
  return request<API.MenuTree>('/admin/menu/tree', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜单过滤树 GET /admin/auth/role/flitertree */
export async function getFliterTree(params: API.TreeParams, options?: Record<string, any>) {
  return request<API.FliterTreeResult>('/admin/menu/flitertree', {
    params: params,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建菜单 POST /admin/menu */
export async function create(data: API.Menu, options?: Record<string, any>) {
  return request<API.Menu>('/admin/menu', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 获取菜单 GET /admin/menu */
export async function get(options?: { [key: React.Key]: any }) {
  return request<API.Menu>('/admin/menu', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改菜单 PUT /admin/menu */
export async function update(data: API.Menu, options?: Record<string, any>) {
  return request<API.Menu>('/admin/menu', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 设置菜单状态 PUT /admin/menu/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.Menu>('/admin/menu/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /admin/menu */
export async function remove(keys: React.Key[], options?: Record<string, any>) {
  return request<{}>('/admin/menu', {
    method: 'DELETE',
    data: {
      keys: keys
    },
    ...(options || {}),
  });
}


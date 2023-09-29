// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 媒体上传接口 POST /admin/meida */
export async function upload(body: any, options?: Record<string, any>) {
  return request<API.Media>('/admin/media', {
    method: 'POST',
    requestType: 'form',
    data: body,
    // headers: {'Content-Type': 'multipart/form-data',},
    ...(options || {}),
  });
}

/** 媒体获取接口 GET /admin/meida */
export async function get(key: string, options?: Record<string, any>) {
  return request<API.Media>('/admin/media', {
    method: 'GET',
    params: {
      key: key
    },
    ...(options || {}),
  });
}

/** 媒体获取接口 GET /admin/meidas */
export async function getPage(
  params: API.PageParams,
  options?: Record<string, any>,
) {
  return request<API.MediaPage>('/admin/medias', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 媒体解析接口 GET /admin/media/parser */
export async function parser(url: string, options?: Record<string, any>) {
  return request<API.Media>('/admin/media/parser', {
    method: 'GET',
    params: {
      url: url
    },
    ...(options || {}),
  });
}

/** 设置用户状态 PUT /admin/media/status */
export async function setStatus(data: {key: React.Key, value: 'normal' | 'disabled'}, options?: Record<string, any>) {
  return request<API.Media>('/admin/media/status', {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 媒体删除接口 DELETE /admin/meida */
export async function remove(keys: string[], options?: Record<string, any>) {
  return request<{}>('/admin/media', {
    method: 'DELETE',
    params: {
      keys: keys
    },
    ...(options || {}),
  });
}
// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Media = {
    /** 表索引 */
    key: string
    /** 用户索引 */
    userKey: string
    /** 文件名 */
    name: string
    /** 路径 */
    path: string
    /** 大小 */
    size: number
    /** 哈希值 */
    hash: string
    /** 文件类型 */
    fileType: string
    /** MIME类型 */
    mimeType: string
    /** 透传数据 */
    extparam?: string
    /** 储存库 */
    storage?: string
    /** 创建日期 */
    createAt: string
    /** 更新日期 */
    updateAt: string
    /** 状态 */
    status: string
  }

  type MediaPage = PageResult<Media>
}
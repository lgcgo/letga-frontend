// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageResult<T> = {
    data?: T[];
    /** 列表的内容总数 */
    currentPage?: number;
    size?: number;
    total?: number;
    ctxSelectedKeys?: React.Key[]
    ctxDisabledKeys?: React.Key[]
  };

  type PageParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 排序方式 */
    sort?: string;
    /** 简单搜索 */
    search?: string;

    /** 其他参数 */
    [key: string]: any
  };

  type BizCtx = {
    /** 业务场景 */
    ctxScene?: string
    /** 其他参数 */
    [key: string]: any
  }
  
  // 树数据入参
  type TreeParams = {
    keys ?: string[]
    search?: string;
  } & BizCtx
  
  type FliterTreeData = {
    key ?: string
    parentKey ?: string
    title ?: string
    count ?: number
  }
  type FliterTreeNode = {
    key: string
    parentKey: string
    title : string
    weight: number
    source: FliterTreeData
    children: FliterTreeNode[]
  }
  type FliterTreeItem = {
    name: string
    data?: FliterTreeNode[]
    Total?: number
  }
  type FliterTreeResult = {
    data: FliterTreeItem[]
  }
}
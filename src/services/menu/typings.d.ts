// @ts-ignore
/* eslint-disable */

declare namespace API {

type Menu = {
    key: string
    parentKey: string
    title: string
    icon?: string
    coverUrl?: string
    remark?: string
    weight: number
    status: string
    createAt: string
    updateAt: string
  }
  type MenuTreeNode = {
    key: string
    parentKey: string
    title: string
    weight: number
    source: Menu
    children: MenuTreeNode[]
  }
  type MenuTree = {
    data: MenuTreeNode[]
    ctxSelectedKeys?: React.Key[]
    ctxDisabledKeys?: React.Key[]
  }

}
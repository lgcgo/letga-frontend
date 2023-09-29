// @ts-ignore
/* eslint-disable */

declare namespace API {

  type AuthAccess = {
    /** 索引 */
    key: string
    /** 用户索引 */
    userKey: string
    /** 角色索引 */
    roleKey: string
    /** 用户信息 */
    user: User
    /** 角色信息 */
    role: AuthRole
    /** 状态 */
    status: string
    /** 创建日期 */
    createAt: string
  }

  type AuthAccessPageParams = {
    key?: string
    userKey?: string
    roleKey?: string
  } & PageParams
  
  type AuthAccessPage = PageResult<AuthAccess>

  type AuthAccessSetupParam = {
    userKey?: string
    appendRoleKeys?: string[]
    removeRoleKeys?: string[]
  }

  type AuthRole = {
    key: string
    parentKey: string
    title: string
    name: string
    weight: number
    createAt: string
    updateAt: string
    status: string
  }

  type AuthRoleCreate = {
    appendRouteKeys?: React.Key[]
  } & AuthRole

  type AuthRoleUpdate = {
    appendRouteKeys?: React.Key[]
    removeRouteKeys?: React.Key[]
  } & AuthRole

  type AuthRoleTreeNode = {
    key: string
    parentKey: string
    title: string
    weight: number
    source: AuthRole
    children: AuthRoleTreeNode[]
  }
  type AuthRoleTree = {
    data: AuthRoleTreeNode[]
    ctxSelectedKeys?: React.Key[]
    ctxDisabledKeys?: React.Key[]
  }

  /**
   * 角色授权
   */
  type AuthRoleAccess = {
    key: string
    RoleKey: string
    Role: AuthRole
    RouteKey: string
    Route: AuthRoute
    weight: number
    createAt: string
    status: string
  }

  type AuthRoleAccessPage = PageResult<AuthRoleAccess> & {
    appendKeys?: React.Key[]
    removeKeys?: React.Key[]
    ctxCurrentKeys?: React.Key[]
  };

  /**
   * 权限路由
   */
  type AuthRoute = {
    /** 索引 */
    key: string
    /** 菜单索引 */
    menuKey?: string
    /** 菜单对象 */
    menu?: AuthMenu
    /** 标题 */
    title?: string
    /** 路由地址 */
    path?: string
    /** 请求方法 */
    method?: string
    /** 描述 */
    remark?: string
    /** 权重 */
    weight?: number
    /** 状态 */
    status?: string
    /** 创建日期 */
    createAt?: string
    /** 更新日期 */
    updateAt?: string
  }

  type AuthRoutePage = PageResult<AuthRoute> & {
    ctxDirectKeys?: string[]
  }
}
/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/signin',
    layout: false,
    name: 'login',
    component: './Signin',
  },
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    name: 'users',
    icon: 'TeamOutlined',
    path: '/users',
    routes: [
      {
        path: '/users',
        component: './User/index',
        hideInMenu: true,
      },
      {
        name: 'users-new',
        path: '/users/new',
        component: './User/new',
        parentKeys: ['/users'],
        hideInMenu: true,
      },
      {
        name: 'users-update',
        path: '/users/update/:id',
        component: './User/update',
        parentKeys: ['/users'],
        hideInMenu: true,
      },
    ]
  },
  // {
  //   name: 'user',
  //   path: '/user',
  //   routes: [
  //     {
  //       path: '/user',
  //       redirect: '/user/users',
  //     },
  //     {
  //       name: 'users',
  //       path: '/user/users',
  //       icon: 'TeamOutlined',
  //       routes: [
  //         {
  //           name: 'users',
  //           path: '/user/users',
  //           component: './User/user',
  //           hideInMenu: true,
  //         },
  //         {
  //           name: 'users-new',
  //           path: '/user/users/new',
  //           component: './User/user/new',
  //           parentKeys: ['/user/users', '/user'],
  //           hideInMenu: true,
  //         },
  //         {
  //           name: 'users-update',
  //           path: '/user/users/update/:id',
  //           component: './User/user/update',
  //           parentKeys: ['/user/users', '/user'],
  //           hideInMenu: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    name: 'auth',
    path: '/auth',
    routes: [
      {
        path: '/auth',
        redirect: '/auth/roles',
      },
      {
        name: 'auth-roles',
        path: '/auth/roles',
        icon: 'UserOutlined',
        routes: [
          {
            name: 'auth-roles',
            path: '/auth/roles',
            component: './Auth/role',
            hideInMenu: true,
          },
          {
            name: 'auth-roles-new',
            path: '/auth/roles/new',
            component: './Auth/role/new',
            parentKeys: ['/auth/roles', '/auth'],
            hideInMenu: true,
          },
          {
            name: 'auth-roles-update',
            path: '/auth/roles/update/:id',
            component: './Auth/role/update',
            parentKeys: ['/auth/roles', '/auth'],
            hideInMenu: true,
          },
        ]
      },
      {
        name: 'auth-routes',
        icon: 'BranchesOutlined',
        path: '/auth/routes',
        routes: [
          {
            name: 'auth-routes',
            path: '/auth/routes',
            component: './Auth/route',
            parentKeys: ['/auth/routes', '/auth'],
            hideInMenu: true,
          },
          {
            name: 'auth-routes-new',
            path: '/auth/routes/new',
            component: './Auth/route/new',
            parentKeys: ['/auth/routes', '/auth'],
            hideInMenu: true,
          },
          {
            name: 'auth-routes-update',
            path: '/auth/routes/update/:id',
            component: './Auth/route/update',
            parentKeys: ['/auth/routes', '/auth'],
            hideInMenu: true,
          },
        ]
      },
      {
        name: 'auth-accesses',
        icon: 'KeyOutlined',
        path: '/auth/accesses',
        routes: [
          {
            name: 'auth-accesses',
            path: '/auth/accesses',
            component: './Auth/access/index',
            hideInMenu: true,
          },
          {
            name: 'auth-accesses-setup',
            path: '/auth/accesses/setup',
            component: './Auth/access/setup',
            parentKeys: ['/auth/accesses', '/auth'],
            hideInMenu: true,
          },
        ],
      },
    ]
  },
  {
    name: 'menus',
    icon: 'MenuOutlined',
    path: '/menus',
    routes: [
      {
        path: '/menus',
        component: './Menu/index',
        hideInMenu: true,
      },
      {
        name: 'menus-new',
        path: '/menus/new',
        component: './Menu/new',
        parentKeys: ['/menus'],
        hideInMenu: true,
      },
      {
        name: 'menus-update',
        path: '/menus/update/:id',
        component: './Menu/update',
        parentKeys: ['/menus'],
        hideInMenu: true,
      },
    ]
  },
  {
    name: 'medias',
    icon: 'PaperClipOutlined',
    path: '/medias',
    routes: [
      {
        path: '/medias',
        component: './Media/index',
        hideInMenu: true,
      },
    ]
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

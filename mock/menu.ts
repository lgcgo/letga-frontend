import { Request, Response } from 'express';
import { warnMsg } from './_utils';

export default {
  'GET /admin/menu': (req: Request, res: Response) => {
    res.send({
      "key": "yjKaskDv",
      "parentKey": "Q0mZSpAv",
      "title": "后台首页",
      "icon": "",
      "coverUrl": "",
      "remark": "",
      "createAt": "2023-09-07 05:21:01",
      "updateAt": "2023-09-07 08:18:38",
      "status": "normal"
    })
  },
  'GET /admin/menu/tree': (req: Request, res: Response) => {
    res.send({
      "data": [
        {
          "key": "Q0mZSpAv",
          "parentKey": "",
          "title": "后台系统",
          "weight": 9999,
          "source": {
            "key": "Q0mZSpAv",
            "parentKey": "",
            "title": "后台系统",
            "icon": "",
            "coverUrl": "",
            "remark": "Letga后台管理系统相关导航",
            "createAt": "2023-09-07 05:16:44",
            "updateAt": "2023-09-07 05:16:44",
            "status": "normal"
          },
          "children": [
            {
              "key": "yjKaskDv",
              "parentKey": "Q0mZSpAv",
              "title": "后台首页",
              "weight": 999,
              "source": {
                "key": "yjKaskDv",
                "parentKey": "Q0mZSpAv",
                "title": "后台首页",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 05:21:01",
                "updateAt": "2023-09-07 08:18:38",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "zv4AtYPV",
              "parentKey": "Q0mZSpAv",
              "title": "用户管理",
              "weight": 998,
              "source": {
                "key": "zv4AtYPV",
                "parentKey": "Q0mZSpAv",
                "title": "用户管理",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 05:21:46",
                "updateAt": "2023-09-07 05:21:46",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "70ZNf9Z0",
              "parentKey": "Q0mZSpAv",
              "title": "权限分组",
              "weight": 997,
              "source": {
                "key": "70ZNf9Z0",
                "parentKey": "Q0mZSpAv",
                "title": "权限分组",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 05:22:29",
                "updateAt": "2023-09-07 08:17:26",
                "status": "normal"
              },
              "children": [
                {
                  "key": "3voqh5Bj",
                  "parentKey": "70ZNf9Z0",
                  "title": "权限角色",
                  "weight": 99,
                  "source": {
                    "key": "3voqh5Bj",
                    "parentKey": "70ZNf9Z0",
                    "title": "权限角色",
                    "icon": "",
                    "coverUrl": "",
                    "remark": "",
                    "createAt": "2023-09-07 08:50:31",
                    "updateAt": "2023-09-07 08:52:28",
                    "status": "normal"
                  },
                  "children": []
                },
                {
                  "key": "N0QeCqw0",
                  "parentKey": "70ZNf9Z0",
                  "title": "权限路由",
                  "weight": 98,
                  "source": {
                    "key": "N0QeCqw0",
                    "parentKey": "70ZNf9Z0",
                    "title": "权限路由",
                    "icon": "",
                    "coverUrl": "",
                    "remark": "",
                    "createAt": "2023-09-07 08:52:41",
                    "updateAt": "2023-09-07 08:52:41",
                    "status": "normal"
                  },
                  "children": []
                },
                {
                  "key": "WjGzUgJV",
                  "parentKey": "70ZNf9Z0",
                  "title": "用户授权",
                  "weight": 97,
                  "source": {
                    "key": "WjGzUgJV",
                    "parentKey": "70ZNf9Z0",
                    "title": "用户授权",
                    "icon": "",
                    "coverUrl": "",
                    "remark": "",
                    "createAt": "2023-09-07 08:52:57",
                    "updateAt": "2023-09-07 08:52:57",
                    "status": "normal"
                  },
                  "children": []
                }
              ]
            },
            {
              "key": "rvRNuGWv",
              "parentKey": "Q0mZSpAv",
              "title": "媒体管理",
              "weight": 996,
              "source": {
                "key": "rvRNuGWv",
                "parentKey": "Q0mZSpAv",
                "title": "媒体管理",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 05:22:56",
                "updateAt": "2023-09-07 05:23:20",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "40ddIA60",
              "parentKey": "Q0mZSpAv",
              "title": "菜单管理",
              "weight": 995,
              "source": {
                "key": "40ddIA60",
                "parentKey": "Q0mZSpAv",
                "title": "菜单管理",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 05:23:33",
                "updateAt": "2023-09-07 05:23:33",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "8jn7cxJ0",
              "parentKey": "Q0mZSpAv",
              "title": "系统设置",
              "weight": 0,
              "source": {
                "key": "8jn7cxJ0",
                "parentKey": "Q0mZSpAv",
                "title": "系统设置",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-07 07:52:33",
                "updateAt": "2023-09-07 08:53:44",
                "status": "normal"
              },
              "children": []
            }
          ]
        },
        {
          "key": "9vlzTGBj",
          "parentKey": "",
          "title": "前台API",
          "weight": 9990,
          "source": {
            "key": "9vlzTGBj",
            "parentKey": "",
            "title": "前台API",
            "icon": "",
            "coverUrl": "",
            "remark": "",
            "createAt": "2023-09-28 22:36:01",
            "updateAt": "2023-09-28 22:36:25",
            "status": "normal"
          },
          "children": [
            {
              "key": "gjxkH86V",
              "parentKey": "9vlzTGBj",
              "title": "注册登录",
              "weight": 989,
              "source": {
                "key": "gjxkH86V",
                "parentKey": "9vlzTGBj",
                "title": "注册登录",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-28 22:41:13",
                "updateAt": "2023-09-28 22:44:46",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "Mv5wFZPj",
              "parentKey": "9vlzTGBj",
              "title": "账户中心",
              "weight": 988,
              "source": {
                "key": "Mv5wFZPj",
                "parentKey": "9vlzTGBj",
                "title": "账户中心",
                "icon": "",
                "coverUrl": "",
                "remark": "",
                "createAt": "2023-09-28 22:41:46",
                "updateAt": "2023-09-28 22:44:54",
                "status": "normal"
              },
              "children": []
            }
          ]
        },
        {
          "key": "bjyXi4RV",
          "parentKey": "",
          "title": "演示应用",
          "weight": 9980,
          "source": {
            "key": "bjyXi4RV",
            "parentKey": "",
            "title": "演示应用",
            "icon": "",
            "coverUrl": "",
            "remark": "",
            "createAt": "2023-09-28 22:38:55",
            "updateAt": "2023-09-28 22:38:55",
            "status": "normal"
          },
          "children": []
        }
      ],
      "ctxSelectedKeys": null,
      "ctxDisabledKeys": null
    })
  },
  'GET /admin/menu/flitertree': (req: Request, res: Response) => {
    let ctxScene = req.param('ctxScene')
    res.send({
      "data": [
        {
          "name": "menu",
          "data": [
            {
              "key": "Q0mZSpAv",
              "parentKey": "",
              "title": "后台系统",
              "weight": 9999,
              "source": {
                "key": "Q0mZSpAv",
                "parentKey": "",
                "title": "后台系统",
                "count": 36,
                "weight": 9999
              },
              "children": [
                {
                  "key": "yjKaskDv",
                  "parentKey": "Q0mZSpAv",
                  "title": "后台首页",
                  "weight": 999,
                  "source": {
                    "key": "yjKaskDv",
                    "parentKey": "Q0mZSpAv",
                    "title": "后台首页",
                    "count": 0,
                    "weight": 999
                  },
                  "children": []
                },
                {
                  "key": "zv4AtYPV",
                  "parentKey": "Q0mZSpAv",
                  "title": "用户管理",
                  "weight": 998,
                  "source": {
                    "key": "zv4AtYPV",
                    "parentKey": "Q0mZSpAv",
                    "title": "用户管理",
                    "count": 6,
                    "weight": 998
                  },
                  "children": []
                },
                {
                  "key": "70ZNf9Z0",
                  "parentKey": "Q0mZSpAv",
                  "title": "权限分组",
                  "weight": 997,
                  "source": {
                    "key": "70ZNf9Z0",
                    "parentKey": "Q0mZSpAv",
                    "title": "权限分组",
                    "count": 17,
                    "weight": 997
                  },
                  "children": [
                    {
                      "key": "3voqh5Bj",
                      "parentKey": "70ZNf9Z0",
                      "title": "权限角色",
                      "weight": 99,
                      "source": {
                        "key": "3voqh5Bj",
                        "parentKey": "70ZNf9Z0",
                        "title": "权限角色",
                        "count": 7,
                        "weight": 99
                      },
                      "children": []
                    },
                    {
                      "key": "N0QeCqw0",
                      "parentKey": "70ZNf9Z0",
                      "title": "权限路由",
                      "weight": 98,
                      "source": {
                        "key": "N0QeCqw0",
                        "parentKey": "70ZNf9Z0",
                        "title": "权限路由",
                        "count": 6,
                        "weight": 98
                      },
                      "children": []
                    },
                    {
                      "key": "WjGzUgJV",
                      "parentKey": "70ZNf9Z0",
                      "title": "用户授权",
                      "weight": 97,
                      "source": {
                        "key": "WjGzUgJV",
                        "parentKey": "70ZNf9Z0",
                        "title": "用户授权",
                        "count": 4,
                        "weight": 97
                      },
                      "children": []
                    }
                  ]
                },
                {
                  "key": "rvRNuGWv",
                  "parentKey": "Q0mZSpAv",
                  "title": "媒体管理",
                  "weight": 996,
                  "source": {
                    "key": "rvRNuGWv",
                    "parentKey": "Q0mZSpAv",
                    "title": "媒体管理",
                    "count": 6,
                    "weight": 996
                  },
                  "children": []
                },
                {
                  "key": "40ddIA60",
                  "parentKey": "Q0mZSpAv",
                  "title": "菜单管理",
                  "weight": 995,
                  "source": {
                    "key": "40ddIA60",
                    "parentKey": "Q0mZSpAv",
                    "title": "菜单管理",
                    "count": 7,
                    "weight": 995
                  },
                  "children": []
                },
                {
                  "key": "8jn7cxJ0",
                  "parentKey": "Q0mZSpAv",
                  "title": "系统设置",
                  "weight": 0,
                  "source": {
                    "key": "8jn7cxJ0",
                    "parentKey": "Q0mZSpAv",
                    "title": "系统设置",
                    "count": 0,
                    "weight": 0
                  },
                  "children": []
                }
              ]
            },
            {
              "key": "9vlzTGBj",
              "parentKey": "",
              "title": "前台API",
              "weight": 9990,
              "source": {
                "key": "9vlzTGBj",
                "parentKey": "",
                "title": "前台API",
                "count": 4,
                "weight": 9990
              },
              "children": [
                {
                  "key": "gjxkH86V",
                  "parentKey": "9vlzTGBj",
                  "title": "注册登录",
                  "weight": 989,
                  "source": {
                    "key": "gjxkH86V",
                    "parentKey": "9vlzTGBj",
                    "title": "注册登录",
                    "count": 4,
                    "weight": 989
                  },
                  "children": []
                },
                {
                  "key": "Mv5wFZPj",
                  "parentKey": "9vlzTGBj",
                  "title": "账户中心",
                  "weight": 988,
                  "source": {
                    "key": "Mv5wFZPj",
                    "parentKey": "9vlzTGBj",
                    "title": "账户中心",
                    "count": 0,
                    "weight": 988
                  },
                  "children": []
                }
              ]
            },
            {
              "key": "bjyXi4RV",
              "parentKey": "",
              "title": "演示应用",
              "weight": 9980,
              "source": {
                "key": "bjyXi4RV",
                "parentKey": "",
                "title": "演示应用",
                "count": 0,
                "weight": 9980
              },
              "children": []
            }
          ],
          "total": 14,
          "ctxSelectedKeys": null,
          "ctxDisabledKeys": null
        }
      ]
    })
  },
  'POST /admin/menu': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'PUT /admin/menu/status': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'DELETE /admin/menu': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  }
}
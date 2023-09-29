import { Request, Response } from 'express';
import { warnMsg } from './_utils';
export default {
  'GET /admin/auth/role': (req: Request, res: Response) => {
    switch (req.param('key')) {
      case 'PvpySanV':
        res.send({
          "key": "PvpySanV",
          "parentKey": "",
          "title": "超级管理员",
          "name": "root",
          "createAt": "2023-09-04 15:14:10",
          "updateAt": "2023-09-28 02:12:06",
          "status": "normal"
        })
        break;
      case 'r0BysyXj':
        res.send({
          "key": "r0BysyXj",
          "parentKey": "PvpySanV",
          "title": "默认用户",
          "name": "default",
          "createAt": "2023-09-04 15:14:50",
          "updateAt": "2023-09-28 01:58:47",
          "status": "normal"
        })
        break;
      default:
        res.send({
          "key": "pvgdIPgV",
          "parentKey": "PvpySanV",
          "title": "测试用户",
          "name": "TestUser",
          "createAt": "2023-09-28 02:16:33",
          "updateAt": "2023-09-28 02:19:37",
          "status": "normal"
        })
        break;
    }
  },
  'GET /admin/auth/role/tree': (req: Request, res: Response) => {
    // let ctxSelectedKeys: string[] = []
    let ctxDisabledKeys: string[] = []
    switch (req.param('ctxScene')) {
      case 'mainTable':
        ctxDisabledKeys = [
          "PvpySanV",
          "r0BysyXj"
        ]
        break;
      default:
        break;
    }
    res.send({
      "data": [
        {
          "key": "PvpySanV",
          "parentKey": "",
          "title": "超级管理员",
          "weight": 9999,
          "source": {
            "key": "PvpySanV",
            "parentKey": "",
            "title": "超级管理员",
            "name": "root",
            "createAt": "2023-09-04 15:14:10",
            "updateAt": "2023-09-28 02:12:06",
            "status": "normal"
          },
          "children": [
            {
              "key": "r0BysyXj",
              "parentKey": "PvpySanV",
              "title": "默认用户",
              "weight": 999,
              "source": {
                "key": "r0BysyXj",
                "parentKey": "PvpySanV",
                "title": "默认用户",
                "name": "default",
                "createAt": "2023-09-04 15:14:50",
                "updateAt": "2023-09-28 01:58:47",
                "status": "normal"
              },
              "children": []
            },
            {
              "key": "bV7qtrq0",
              "parentKey": "PvpySanV",
              "title": "后台用户",
              "weight": 998,
              "source": {
                "key": "bV7qtrq0",
                "parentKey": "PvpySanV",
                "title": "后台用户",
                "name": "SubManger",
                "createAt": "2023-09-06 19:54:29",
                "updateAt": "2023-09-28 01:58:25",
                "status": "normal"
              },
              "children": [
                {
                  "key": "7VzGfebj",
                  "parentKey": "bV7qtrq0",
                  "title": "内容管理员",
                  "weight": 0,
                  "source": {
                    "key": "7VzGfebj",
                    "parentKey": "bV7qtrq0",
                    "title": "内容管理员",
                    "name": "SubSubManger1",
                    "createAt": "2023-09-08 13:17:49",
                    "updateAt": "2023-09-28 02:08:15",
                    "status": "normal"
                  },
                  "children": []
                },
                {
                  "key": "WVeBuD6j",
                  "parentKey": "bV7qtrq0",
                  "title": "系统管理员",
                  "weight": 0,
                  "source": {
                    "key": "WVeBuD6j",
                    "parentKey": "bV7qtrq0",
                    "title": "系统管理员",
                    "name": "SubSubManger2",
                    "createAt": "2023-09-08 13:21:20",
                    "updateAt": "2023-09-28 02:09:55",
                    "status": "normal"
                  },
                  "children": []
                }
              ]
            },
            {
              "key": "pvgdIPgV",
              "parentKey": "PvpySanV",
              "title": "测试用户",
              "weight": 0,
              "source": {
                "key": "pvgdIPgV",
                "parentKey": "PvpySanV",
                "title": "测试用户",
                "name": "TestUser",
                "createAt": "2023-09-28 02:16:33",
                "updateAt": "2023-09-28 02:19:37",
                "status": "normal"
              },
              "children": []
            }
          ]
        }
      ],
      "ctxSelectedKeys": null,
      "ctxDisabledKeys": ctxDisabledKeys
    })
  },
  'GET /admin/auth/role/flitertree': (req: Request, res: Response) => {

    res.send({
      "data": [
        {
          "name": "role",
          "data": [
            {
              "key": "PvpySanV",
              "parentKey": "",
              "title": "超级管理员",
              "weight": 9999,
              "source": {
                "key": "PvpySanV",
                "parentKey": "",
                "title": "超级管理员",
                "count": 8,
                "weight": 9999
              },
              "children": [
                {
                  "key": "r0BysyXj",
                  "parentKey": "PvpySanV",
                  "title": "默认用户",
                  "weight": 999,
                  "source": {
                    "key": "r0BysyXj",
                    "parentKey": "PvpySanV",
                    "title": "默认用户",
                    "count": 0,
                    "weight": 999
                  },
                  "children": []
                },
                {
                  "key": "bV7qtrq0",
                  "parentKey": "PvpySanV",
                  "title": "后台用户",
                  "weight": 998,
                  "source": {
                    "key": "bV7qtrq0",
                    "parentKey": "PvpySanV",
                    "title": "后台用户",
                    "count": 4,
                    "weight": 998
                  },
                  "children": [
                    {
                      "key": "7VzGfebj",
                      "parentKey": "bV7qtrq0",
                      "title": "内容管理员",
                      "weight": 0,
                      "source": {
                        "key": "7VzGfebj",
                        "parentKey": "bV7qtrq0",
                        "title": "内容管理员",
                        "count": 1,
                        "weight": 0
                      },
                      "children": []
                    },
                    {
                      "key": "WVeBuD6j",
                      "parentKey": "bV7qtrq0",
                      "title": "系统管理员",
                      "weight": 0,
                      "source": {
                        "key": "WVeBuD6j",
                        "parentKey": "bV7qtrq0",
                        "title": "系统管理员",
                        "count": 1,
                        "weight": 0
                      },
                      "children": []
                    }
                  ]
                },
                {
                  "key": "pvgdIPgV",
                  "parentKey": "PvpySanV",
                  "title": "测试用户",
                  "weight": 0,
                  "source": {
                    "key": "pvgdIPgV",
                    "parentKey": "PvpySanV",
                    "title": "测试用户",
                    "count": 3,
                    "weight": 0
                  },
                  "children": []
                }
              ]
            }
          ],
          "total": 6,
          "ctxSelectedKeys": null,
          "ctxDisabledKeys": null
        }
      ]
    })
  },
  'POST /admin/auth/role': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'PUT /admin/auth/role/status': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'DELETE /admin/auth/role': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  }
}
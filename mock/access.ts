import { Request, Response } from 'express';
import { warnMsg } from './_utils';
export default {
  'GET /admin/auth/accesses': (req: Request, res: Response) => {
    let ctxScene = req.param('ctxScene')
    let roks = req.param('roks')
    if (roks) {
      return res.send(warnMsg('Mock模式下暂不支持此功能'))
    }
    res.send({
      "data": [
        {
          "key": "pvgDS6gV",
          "userKey": "rvRESKR0",
          "user": {
            "key": "rvRESKR0",
            "uuid": "3y4eyz08zg0cv5yjfwldz5s100tawyhg",
            "account": "letga",
            "nickname": "Letga",
            "avatar": "/upload/20230904/cv9y7efhuuh4a4o5z5.png",
            "mobile": "13800138001",
            "email": "letga@qq.com",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "root",
            "signinIp": "",
            "signinAt": "2023-09-29 03:40:23",
            "status": "normal",
            "createAt": "2023-08-30 22:43:19",
            "updateAt": "2023-09-29 03:40:23"
          },
          "roleKey": "PvpySanV",
          "role": {
            "key": "PvpySanV",
            "parentKey": "",
            "title": "超级管理员",
            "name": "root",
            "createAt": "2023-09-04 15:14:10",
            "updateAt": "2023-09-28 02:12:06",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-08-28 20:01:01"
        },
        {
          "key": "1vNbsGOv",
          "userKey": "40drs8QV",
          "user": {
            "key": "40drs8QV",
            "uuid": "3y4eyz09ig0cvcbb7ob7o00100e5c1o3",
            "account": "letgaTest1",
            "nickname": "刘一",
            "avatar": "",
            "mobile": "13800138101",
            "email": "13800138101@qq.com",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 09:59:48",
            "updateAt": "2023-09-07 10:37:01"
          },
          "roleKey": "7VzGfebj",
          "role": {
            "key": "7VzGfebj",
            "parentKey": "bV7qtrq0",
            "title": "内容管理员",
            "name": "SubSubManger1",
            "createAt": "2023-09-08 13:17:49",
            "updateAt": "2023-09-28 02:08:15",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-28 23:10:24"
        },
        {
          "key": "gv9zt9ZV",
          "userKey": "8jnZt1Nj",
          "user": {
            "key": "8jnZt1Nj",
            "uuid": "3y4eyz09ig0cvcc0q9akhxs200ivqbju",
            "account": "letgaTest2",
            "nickname": "陈二",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:33:08",
            "updateAt": "2023-09-07 10:37:11"
          },
          "roleKey": "WVeBuD6j",
          "role": {
            "key": "WVeBuD6j",
            "parentKey": "bV7qtrq0",
            "title": "系统管理员",
            "name": "SubSubManger2",
            "createAt": "2023-09-08 13:21:20",
            "updateAt": "2023-09-28 02:09:55",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-28 23:11:42"
        },
        {
          "key": "bv8ZfQ8j",
          "userKey": "3vo8f2DV",
          "user": {
            "key": "3vo8f2DV",
            "uuid": "3y4eyz09ig0cvcc12dchzj4300ho0csb",
            "account": "letgaTest3",
            "nickname": "张三",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:33:34",
            "updateAt": "2023-09-07 10:37:33"
          },
          "roleKey": "bV7qtrq0",
          "role": {
            "key": "bV7qtrq0",
            "parentKey": "PvpySanV",
            "title": "后台用户",
            "name": "SubManger",
            "createAt": "2023-09-06 19:54:29",
            "updateAt": "2023-09-28 01:58:25",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-28 23:12:16"
        },
        {
          "key": "PVDou7wv",
          "userKey": "N0QNuyBv",
          "user": {
            "key": "N0QNuyBv",
            "uuid": "3y4eyz09ig0cvcc1b2v3244400gspt1u",
            "account": "letgaTest4",
            "nickname": "李四",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:33:53",
            "updateAt": "2023-09-07 10:37:45"
          },
          "roleKey": "pvgdIPgV",
          "role": {
            "key": "pvgdIPgV",
            "parentKey": "PvpySanV",
            "title": "测试用户",
            "name": "TestUser",
            "createAt": "2023-09-28 02:16:33",
            "updateAt": "2023-09-28 02:19:37",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-28 23:12:38"
        },
        {
          "key": "Av2oI76V",
          "userKey": "WjG2IOXV",
          "user": {
            "key": "WjG2IOXV",
            "uuid": "3y4eyz09ig0cvcc1l2t46zk500p2jgrn",
            "account": "letgaTest5",
            "nickname": "王五",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:34:15",
            "updateAt": "2023-09-07 10:37:59"
          },
          "roleKey": "pvgdIPgV",
          "role": {
            "key": "pvgdIPgV",
            "parentKey": "PvpySanV",
            "title": "测试用户",
            "name": "TestUser",
            "createAt": "2023-09-28 02:16:33",
            "updateAt": "2023-09-28 02:19:37",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-29 04:36:17"
        },
        {
          "key": "RvELcGy0",
          "userKey": "9vlpcxav",
          "user": {
            "key": "9vlpcxav",
            "uuid": "3y4eyz09ig0cvcc1wv50a2w600qmkog6",
            "account": "letgaTest6",
            "nickname": "赵六",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:34:40",
            "updateAt": "2023-09-07 10:38:13"
          },
          "roleKey": "bV7qtrq0",
          "role": {
            "key": "bV7qtrq0",
            "parentKey": "PvpySanV",
            "title": "后台用户",
            "name": "SubManger",
            "createAt": "2023-09-06 19:54:29",
            "updateAt": "2023-09-28 01:58:25",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-29 04:36:38"
        },
        {
          "key": "o0Onh8zj",
          "userKey": "9vlpcxav",
          "user": {
            "key": "9vlpcxav",
            "uuid": "3y4eyz09ig0cvcc1wv50a2w600qmkog6",
            "account": "letgaTest6",
            "nickname": "赵六",
            "avatar": "",
            "mobile": "",
            "email": "",
            "signature": "",
            "signinFailure": 0,
            "signinRole": "",
            "signinIp": "",
            "signinAt": "",
            "status": "normal",
            "createAt": "2023-09-07 10:34:40",
            "updateAt": "2023-09-07 10:38:13"
          },
          "roleKey": "pvgdIPgV",
          "role": {
            "key": "pvgdIPgV",
            "parentKey": "PvpySanV",
            "title": "测试用户",
            "name": "TestUser",
            "createAt": "2023-09-28 02:16:33",
            "updateAt": "2023-09-28 02:19:37",
            "status": "normal"
          },
          "status": "normal",
          "createAt": "2023-09-29 04:36:38"
        }
      ],
      "total": 8,
      "ctxSelectedKeys": null,
      "ctxDisabledKeys": [
        "pvgDS6gV"
      ]
    })
  },
  'PUT /admin/auth/access/status': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'DELETE /admin/auth/access': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  }
}
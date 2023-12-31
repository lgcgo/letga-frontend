import { Request, Response } from 'express';
import { warnMsg } from './_utils';
export default {
  'GET /admin/user': (req: Request, res: Response) => {
    return res.send({
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
    })
  },
  'GET /admin/users': (req: Request, res: Response) => {
    return res.send({
      "data": [
        {
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
          "signinAt": "2023-09-28 06:42:55",
          "status": "normal",
          "createAt": "2023-08-30 22:43:19",
          "updateAt": "2023-09-28 06:42:55"
        },
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
          "key": "bjyMhzpj",
          "uuid": "3y4eyz09ig0cvcc2ukh6yrc700fk2exj",
          "account": "letgaTest7",
          "nickname": "孙七",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:35:54",
          "updateAt": "2023-09-07 10:38:25"
        },
        {
          "key": "gjxZCLAv",
          "uuid": "3y4eyz09ig0cvcc31pfop3w800fs768h",
          "account": "letgaTest8",
          "nickname": "周八",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:36:09",
          "updateAt": "2023-09-07 10:38:41"
        },
        {
          "key": "Mv5gUM7j",
          "uuid": "3y4eyz09ig0cvcc5l88nhco900d6nmuf",
          "account": "letgaTest9",
          "nickname": "吴九",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:39:29",
          "updateAt": "2023-09-07 10:39:29"
        },
        {
          "key": "R0wxT24v",
          "uuid": "3y4eyz09ig0cvcc60g1u3r0a00j00td8",
          "account": "LetgaTest10",
          "nickname": "郑十",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:40:02",
          "updateAt": "2023-09-07 10:40:02"
        },
        {
          "key": "Mj1bi7J0",
          "uuid": "3y4eyz09ig0cvcc6m7hhskgb00rm36up",
          "account": "Menterma",
          "nickname": "Menterma",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:40:49",
          "updateAt": "2023-09-07 10:40:49"
        },
        {
          "key": "QjPYHkG0",
          "uuid": "3y4eyz09ig0cvcc6t0d5xlgc000js50e",
          "account": "Mibargu",
          "nickname": "Mibargu",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:41:04",
          "updateAt": "2023-09-07 10:41:04"
        },
        {
          "key": "3VrDF4A0",
          "uuid": "3y4eyz09ig0cvcc6yjmwz00d000t2dp6",
          "account": "Comfyre",
          "nickname": "Comfyre",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:41:16",
          "updateAt": "2023-09-07 10:41:16"
        },
        {
          "key": "EVYBSpnj",
          "uuid": "3y4eyz09ig0cvcc7eu6hxwoe00zibj70",
          "account": "Sityqsou",
          "nickname": "Sityqsou",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:41:51",
          "updateAt": "2023-09-07 10:41:51"
        },
        {
          "key": "nvkYsroj",
          "uuid": "3y4eyz09ig0cvcc7sqs226of00yplpzl",
          "account": "Mediant",
          "nickname": "Mediant",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:42:22",
          "updateAt": "2023-09-07 10:42:22"
        },
        {
          "key": "r0AltJ7j",
          "uuid": "3y4eyz09ig0cvcc804niojcg003occca",
          "account": "Amazewor",
          "nickname": "Amazewor",
          "avatar": "",
          "mobile": "",
          "email": "",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "",
          "signinIp": "",
          "signinAt": "",
          "status": "normal",
          "createAt": "2023-09-07 10:42:38",
          "updateAt": "2023-09-07 10:42:38"
        },
        {
          "key": "MVJ1fX6v",
          "uuid": "3y4eyz0f3c0cvu2kxxjcnv4n00xr1ysr",
          "account": "Test008",
          "nickname": "Test008",
          "avatar": "http://dummyimage.com/100x100",
          "mobile": "18195671381",
          "email": "test008@qq.com",
          "signature": "",
          "signinFailure": 0,
          "signinRole": "default",
          "signinIp": "",
          "signinAt": "2023-09-28 06:57:20",
          "status": "normal",
          "createAt": "2023-09-28 06:57:20",
          "updateAt": "2023-09-28 06:57:20"
        }
      ],
      "total": 18,
      "ctxSelectedKeys": null,
      "ctxDisabledKeys": [
        "rvRESKR0"
      ]
    })
  },
  'POST /admin/user': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'PUT /admin/user/status': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'DELETE /admin/user': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  }
}
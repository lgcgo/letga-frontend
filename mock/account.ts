import { Request, Response } from 'express';
import { errorMsg } from './_utils';

export default {
  'GET /api/account/info': (req: Request, res: Response) => {
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
      "signinAt": "2023-09-28 06:42:55",
      "status": "normal",
      "createAt": "2023-08-30 22:43:19",
      "updateAt": "2023-09-28 06:42:55"
    })
  },
  'POST /api/account/signin': (req: Request, res: Response) => {
    let passport = req.param('passport')
    let password = req.param('password')
    // let role = req.param('role')
    // let type = req.param('type')
    if (passport !== 'letga' || password !== 'letga666') {
      return res.send(errorMsg("passport or password invalid"))
    }
    return res.send({
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3QiOiJncmFudCIsImlzciI6InJvb3QiLCJpc3MiOiJtb25nb2FwaS5jb20iLCJzdWIiOiIzeTRleXowOHpnMGN2NXlqZndsZHo1czEwMHRhd3loZyIsImF1ZCI6WyIiXSwiZXhwIjoxNjk1OTQwOTc0LCJuYmYiOjE2OTU4NTQ1NzQsImlhdCI6MTY5NTg1NDU3NH0.QGecZiVVFzYWTmtCRXoLGnt4TCwey6Wheb3ga5FGLWU",
      "tokenType": "Bearer",
      "expiresIn": "86400",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3QiOiJyZW5ldyIsImlzciI6InJvb3QiLCJpc3MiOiJtb25nb2FwaS5jb20iLCJzdWIiOiIzeTRleXowOHpnMGN2NXlqZndsZHo1czEwMHRhd3loZyIsImF1ZCI6WyIiXSwiZXhwIjoxNjk2MTEzNzc0LCJuYmYiOjE2OTU4NTQ1NzQsImlhdCI6MTY5NTg1NDU3NH0.tmN62iSPSCLtJDGmNkg7hBPLCJwxBbUXO8OZmv0BtWU"
    })
  },
  'PUT /api/account/signout': (req: Request, res: Response) => {
    return res.send("ok")
  },
  'POST /api/account/signup': (req: Request, res: Response) => {
    return res.send({
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3QiOiJncmFudCIsImlzciI6InJvb3QiLCJpc3MiOiJtb25nb2FwaS5jb20iLCJzdWIiOiIzeTRleXowOHpnMGN2NXlqZndsZHo1czEwMHRhd3loZyIsImF1ZCI6WyIiXSwiZXhwIjoxNjk1OTQwOTc0LCJuYmYiOjE2OTU4NTQ1NzQsImlhdCI6MTY5NTg1NDU3NH0.QGecZiVVFzYWTmtCRXoLGnt4TCwey6Wheb3ga5FGLWU",
      "tokenType": "Bearer",
      "expiresIn": "86400",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3QiOiJyZW5ldyIsImlzciI6InJvb3QiLCJpc3MiOiJtb25nb2FwaS5jb20iLCJzdWIiOiIzeTRleXowOHpnMGN2NXlqZndsZHo1czEwMHRhd3loZyIsImF1ZCI6WyIiXSwiZXhwIjoxNjk2MTEzNzc0LCJuYmYiOjE2OTU4NTQ1NzQsImlhdCI6MTY5NTg1NDU3NH0.tmN62iSPSCLtJDGmNkg7hBPLCJwxBbUXO8OZmv0BtWU"
    })
  },
}
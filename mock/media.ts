import { Request, Response } from 'express';
import { warnMsg } from './_utils';

export default {
  'GET /admin/media/parser': (req: Request, res: Response) => {
    res.send({
      "key": "8jn2SMZj",
      "userKey": "rvRESKR0",
      "name": "logo.png",
      "path": "/upload/20230904/cv9y7efhuuh4a4o5z5.png",
      "size": 67011,
      "hash": "f7ddf8625ff016f76917de965453ef034e66f21b97e576fb465283eb60957972",
      "fileType": "png",
      "mimeType": "image/png",
      "extparam": "",
      "storage": "local",
      "status": "normal",
      "createAt": "2023-09-04 15:18:15",
      "updateAt": "2023-09-04 15:18:15"
    })
  },
  'GET /admin/medias': (req: Request, res: Response) => {
    res.send({
      "data": [
        {
          "key": "8jn2SMZj",
          "userKey": "rvRESKR0",
          "name": "logo.png",
          "path": "/upload/20230904/cv9y7efhuuh4a4o5z5.png",
          "size": 67011,
          "hash": "f7ddf8625ff016f76917de965453ef034e66f21b97e576fb465283eb60957972",
          "fileType": "png",
          "mimeType": "image/png",
          "extparam": "",
          "storage": "local",
          "status": "normal",
          "createAt": "2023-09-04 15:18:15",
          "updateAt": "2023-09-04 15:18:15"
        }
      ],
      "total": 1
    })
  },
  'POST /admin/media': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'PUT /admin/media/status': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  },
  'DELETE /admin/media': (req: Request, res: Response) => {
    return res.send(warnMsg('Mock模式下暂不支持此功能'))
  }
}
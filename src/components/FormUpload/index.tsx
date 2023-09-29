import { Form, Modal, Upload, UploadFile, UploadProps, message } from "antd"
import ImgCrop, { ImgCropProps } from "antd-img-crop"
import { useEffect, useState } from "react"
import MediaService from '@/services/media';
import { PlusOutlined } from "@ant-design/icons";
import { RcFile, } from "antd/es/upload";
import React from "react";

export type FormUploadProps = {
  id?: string
  value?: string
  max?: number
  imgCrop?: ImgCropProps
  upload?: UploadProps
  onValueChange?: (value: string) => void
}

const FormUpload: React.FC<FormUploadProps> = ({
  id: inputId = '',
  value: inputValue = '',
  max: max = 1,
  imgCrop: imgCropProps = {},
  upload: uploadProps = {},
  onValueChange: onValueChange,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  
  const form = Form.useFormInstance();
  
  /**
   * 获取图片Base65格式字符串，用于预览
   * @param file 
   * @returns 
   */
  const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const getFiles = (urls: string[]): Promise<UploadFile[]> => new Promise((resolve, reject) => {
    Promise.allSettled(urls.map((url: string) => {
      return MediaService.api.parser(url, {skipErrorHandler: true})
    })).then(res => {
      let files: UploadFile[] = []
      res.forEach((v, k) =>{
        if (v.status == 'fulfilled') {
          files.push({
            uid: v.value.key,
            name: v.value.name,
            status: 'done',
            url: urls[k],
          })
        } else {
          files.push({
            uid: 'file-' + (k+1) + 'id',
            name: 'ErrImg-' + (k+1),
            status: 'error',
            url: urls[k],
          })
        }
      })
      resolve(files)
    })
  })

  const getFilePaths = (files: UploadFile[]): string[] => {
    let paths: string[] = []
    files.forEach(e => {
      paths.push(e.url || '')
    });
    return paths
  }

  const handlePreviewCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const onRemove: UploadProps['onRemove'] = (file: UploadFile) => {
    console.log("onRemove")
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    const value: string = getFilePaths(newFileList).join(',')
    form.setFieldValue(inputId, value)
    form.validateFields([inputId])
    setFileList(newFileList);
    if (typeof onValueChange == 'function') {
      onValueChange(value)
    }
  }

  const beforeUpload = (file: RcFile) => {
    console.log("beforeUpload")
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload = (file: RcFile): Promise<API.Media> => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file)
    MediaService.api.upload(formData).then(res => {
      const paths: string[] = getFilePaths(fileList)
      paths.push(res.path)
      const value: string = paths.join(',')
      form.setFieldValue(inputId, value)
      form.validateFields([inputId])
      if (typeof onValueChange == 'function') {
        onValueChange(value)
      }
    })
  });

  useEffect(() => {
    let inputValuePaths: string[] = (inputValue as string).split(',')

    let fileListPaths: string[] = []
    fileList.forEach(e => {
      fileListPaths.push(e.url || '')
    });
    // 校对缩略图
    if (fileListPaths.toString() == inputValuePaths.toString()) {
      return
    }
    // 更新文件列表
    getFiles(inputValuePaths).then( files =>{
      setFileList(files)
    }).catch((res)=>{
      console.log(res)
    })
  }, [inputValue])

  return (<>
    <ImgCrop onModalOk={(file) => {handleUpload(file as RcFile)}} {...imgCropProps}>
      <Upload
        fileList={fileList}
        listType={'picture-card'}
        maxCount={max}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onRemove={onRemove}
        {...uploadProps}
      >{max > fileList.length && (<PlusOutlined />)}</Upload>
    </ImgCrop>
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handlePreviewCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
    <input
        id={inputId}
        type="text"
        value={inputValue}
        onChange={(e) => { }}
        hidden
      />
  </>)
}

export default FormUpload
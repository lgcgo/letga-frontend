## 介绍
本项目是Letga的前端部分，是基于阿里的 AntDesignPro 脚手架搭建的项目。

基于GoFrame的API后端请前往：[LetgaServer](https://github.com/lgcgo/letga-server)

## 特性
- **体验佳**：践行AntDesign其 **简洁**、**确定**、**一致** 的体验价值
- **国际化**：使用 @umijs/plugin-locale，中文、英文
- **Mock**：为方便前端开发者单独使用，带有一些LetgaServer的部分Mock数据

## 使用
1. 下载代码
```Shell
git clone https://github.com/lgcgo/letga-frontend.git
cd letga-frontend
```

2. 安装依赖
```Shell
npm install
```
或者

```Shell
yarn install
```

3. 启动服务
```Shell
yarn start
```

> ### Mock 注意
> 在`yarn start` 启动后默认启动mock，如果你已经部署并启动Letga后端服务或者不需要Mock数据，请启动前手动关闭Mock功能。

/config/config.ts
```
export default defineConfig({
  /**
   * @name 开启 mock
   * @description yarn start 默认启动mock。如需关闭请去掉注释
   * @doc https://umijs.org/docs/api/config#mock
   */
  mock: false,
  ...
})
```
或者执行no-mock启动命令
```Shell
yarn start:no-mock
```


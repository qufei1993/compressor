# Compressor

> 一款免费开源的文件压缩工具，Compressor 让您的文件体积更小！


语言: [:cn: 中文](/docs/README-zh.md) | [:uk: English](/README.md)

![](/docs/assets/compress-example.png)

## 功能

* [X] 国际化
* [X] 暗黑模式
* [X] 自定义压缩配置参数
* [x] 图像压缩
  * [X] Png
  * [X] Jpeg
  * [X] Gif
  * [x] 转换为 Webp
* [ ] 视频压缩
* [ ] 文档压缩
* [ ] 用户系统

## 技术栈

项目整体以 TypeScript 编程语言为主，服务端使用的 Node.js，以下为主要用到的技术选型。

* 前端：React 18 + redux/toolbox + @vanilla-extract/css + vite + socket.io-client
* 后端：Node.js v16.x + Nest.js + Socket.io

## 本地运行

前后端项目在开发环境都依赖于 Node.js，需要先确保已正确安装 [Node.js](https://nodejs.org/en/download/)，且版本在 v16.x LTS 以上。

```bash
# 下载代码
git clone https://github.com/qufei1993/compressor.git
cd compressor

# 启动客户端
cd client
npm install
npm run dev

# 启动服务端
cd server
npm install
npm run start:dev
```

## Licenses

[BSD-3-Clause license](https://github.com/qufei1993/compressor/blob/main/LICENSE)
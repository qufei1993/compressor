# Compressor

> A free and open source file compression tool, Compressor makes your files smaller!

Languages: [:cn: 中文](/docs/README-zh.md) | [:uk: English](README.md)

![](/docs/assets/compress-example.png)

## Feature

* [X] Internationalization
* [X] Dark Mode
* [X] Customize compression configuration parameters
* [x] Image compression
  * [X] Png
  * [X] Jpeg
  * [X] Gif
  * [x] Convert to Webp
* [ ] Video compression
* [ ] Document compression
* [ ] User system

## Technology stack

The project mainly uses TypeScript programming language and Node.js as the server. The following is the selection of the main technologies used.

* Front end：React 18 + redux/toolbox + @vanilla-extract/css + vite + socket.io-client
* Back end：Node.js v16.x + Nest.js + Socket.io

## Run locally

The front-end and back-end projects depend on Node.js in the development environment. You need to ensure that they are installed correctly and the version is above v16.x LTS.

```bash
# download code
git clone https://github.com/qufei1993/compressor.git
cd compressor

# Start the client
cd client
npm install
npm run dev

# Start the server
cd server
npm install
npm run start:dev
```

## Licenses

[BSD-3-Clause license](https://github.com/qufei1993/compressor/blob/main/LICENSE)
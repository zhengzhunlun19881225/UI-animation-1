# UI Animation 1

基于 Figma 设计稿还原的 React 18 + Vite 前端 Demo，包含两个移动端页面：

- 工厂知识库首页
- 资料库列表页

项目使用纯 JavaScript 与原生 CSS 实现，不额外引入 UI 组件库或动画库，资源图片来自设计稿提供素材。

## 技术栈

- React 18
- Vite
- JavaScript
- 原生 CSS

## 项目结构

```text
.
├── public/
├── src/
│   ├── assets/            # 设计稿图片资源
│   ├── components/        # 可复用组件
│   ├── data/              # 页面静态数据
│   ├── screens/           # 页面级视图
│   ├── App.jsx            # Demo 入口与页面切换
│   ├── App.css            # 页面样式
│   ├── index.css          # 全局样式
│   └── main.jsx           # 应用挂载
├── index.html
├── package.json
└── vite.config.js
```

## 安装依赖

```bash
pnpm install
```

## 本地运行

```bash
pnpm dev
```

默认启动后访问：

```bash
http://localhost:5173
```

## 打包构建

```bash
pnpm build
```

## 说明

- 页面顶部提供了两个 Demo 切换按钮，便于查看两个设计稿页面。
- 桌面端会居中展示移动端画板，移动端宽度下则贴合屏幕显示。

# personal-website

个人网站 —— 学习记录与兴趣探索。

站点内容持续完善中。

## 在线访问

🌐 https://jasper11639.github.io/personal-website/

## 技术栈

VitePress + Markdown,push 到 `main` 后由 GitHub Actions 自动构建并发布到 GitHub Pages。

## 常用命令

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地预览(开发服务器)
npm run docs:build # 生产构建
```

## 新增一篇笔记

详见站内的[写作指南](https://jasper11639.github.io/personal-website/notes/getting-started/how-to-add-note):在 `docs/notes/<主题>/` 下新建 `.md`,并在 `docs/.vitepress/config.mts` 侧边栏登记一行链接后 push 即可。

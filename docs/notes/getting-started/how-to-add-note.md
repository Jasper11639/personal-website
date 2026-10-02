# 如何新增一篇笔记

本站全部内容都是 Markdown 文件,新增一篇笔记只需要两步。

## 一、新建 Markdown 文件

在 `docs/notes/` 下按主题建文件夹(没有合适的就新建一个),然后创建 `.md` 文件:

```
docs/notes/<主题>/<笔记名>.md
```

文件第一行写一个一级标题,就是笔记标题:

```markdown
# 我的笔记标题

正文内容……
```

## 二、登记到侧边栏

打开 `docs/.vitepress/config.mts`,在 `sidebar` 对应主题的 `items` 里加一行:

```ts
{ text: '我的笔记标题', link: '/notes/<主题>/<笔记名>' },
```

注意 `link` 不带 `.md` 后缀,以 `/` 开头。

## 发布

- **本地写作**:`npm run docs:dev` 实时预览,完成后 `git push`,几分钟后自动上线。
- **网页写作**:直接在 GitHub 仓库页面新建/编辑上述文件,Commit 后自动发布。

就是这样,开始写吧 🎉

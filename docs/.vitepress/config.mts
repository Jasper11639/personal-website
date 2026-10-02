import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "Tevin 的学习笔记",
  description: "记录学习,沉淀积累",
  // 站点部署在子路径下,必须与仓库名一致,否则资源 404
  base: '/personal-website/',
  // 设计文档目录不参与站点构建
  srcExclude: ['**/superpowers/**'],
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: 'GitHub', link: 'https://github.com/Jasper11639/personal-website' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: '入门指南',
          items: [
            { text: '笔记总览', link: '/notes/' },
            { text: '如何新增一篇笔记', link: '/notes/getting-started/how-to-add-note' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jasper11639/personal-website' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/Jasper11639/personal-website/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdatedText: '最后更新',
    docFooter: { prev: '上一页', next: '下一页' },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    outline: { label: '本页目录' },
  },
})

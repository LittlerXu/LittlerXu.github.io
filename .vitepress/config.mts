import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LUBAN",
  description: "H5页面搭建平台",
  lang: 'zh-CN',
  appearance: 'dark',
  head: [['link', { rel: 'icon', href: 'https://cdn.cnbj1.fds.api.mi-img.com/activity-platform/upload/upload/78a65fe7-3366-4d6a-886a-6ddb39963294.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
  logo: 'https://cdn.cnbj1.fds.api.mi-img.com/activity-platform/upload/upload/78a65fe7-3366-4d6a-886a-6ddb39963294.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指引', link: '/guide/start',activeMatch: '/guide' },
      { text: '组件', link: '/componentsIntroduce/添加组件',activeMatch: '/componentsIntroduce' },  
      { text: '开发', link: '/develop/组件开发',activeMatch: '/develop' }
    ],

    sidebar: {
      '/guide/': [{
        text: '介绍',
        items: [
          { text: '开始', link: '/guide/start' },
          { text: '', link: '/guide/api-examples' },
        ]
      },{
        text: 'example',
        items: [
          { text: 'Markdown Examples', link: '/guide/markdown-examples' },
          { text: 'Runtime API Examples', link: '/guide/api-examples' },
        ]
      },],
      '/componentsIntroduce/': [{
        text: '组件',
        items: [
          { text: '添加组件', link: '/componentsIntroduce/添加组件' },
        ]
      },],
      '/develop/': [{
        text: '开发',
        items: [
          { text: '组件开发', link: '/develop/组件开发' },
        ]
      },],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  },

  srcDir: './docs'
})

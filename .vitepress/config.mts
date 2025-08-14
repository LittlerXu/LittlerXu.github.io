import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LUBAN",
  description: "H5页面搭建平台",
  lang: 'zh-CN',
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
  logo: 'https://cdn.cnbj1.fds.api.mi-img.com/activity-platform/upload/upload/78a65fe7-3366-4d6a-886a-6ddb39963294.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指引', link: '/guide/markdown-examples',activeMatch: '/guide' },
      { text: '示例', link: '/example/markdown-examples',activeMatch: '/example' }
    ],

    sidebar: {
      '/guide/': [{
        text: '指引',
        items: [
          { text: 'Markdown Examples', link: '/guide/markdown-examples' },
          { text: 'Runtime API Examples', link: '/guide/api-examples' },
          { text: '鲁班平台说明', link: '/guide/鲁班平台说明' }
        ]
      },],
      '/example/': [{
        text: '示例',
        items: [
          { text: 'Markdown Examples', link: '/example/markdown-examples' },
          { text: 'Runtime API Examples', link: '/example/api-examples' }
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

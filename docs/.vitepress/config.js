export default {
  title: "LittlerXu",
  //网站的描述。这将在页面 HTML 中呈现为<meta>标记。
  description: "blogs of LittlerXu",
  //标签页图标
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/NIUBI-removebg.png",
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "博客",
        link: "/blogs/在vite中配置组件图标和接口的自动引入",
      },
      {
        text: "笔记",
        items: [
          { text: "JavaScript", link: "/notes/JavaScript" },
          { text: "Vue", link: "/notes/Vue" },
          { text: "Vue3", link: "/notes/Vue3" },
          { text: "Sass", link: "/notes/Sass" },
          { text: "Axios", link: "/notes/Axios" },
          { text: "Promise", link: "/notes/Promise" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/LittlerXu" }],
    sidebar: {
      "/linux-school/": [
        {
          text: "实验",
          items: [
            {
              text: "实验一",
              link: "/linux-school/experiment/experiment-1",
            },
            {
              text: "实验二",
              link: "/linux-school/experiment/experiment-2",
            },
          ],
          collapsible: true,
          collapsed: true,
        },
      ],
      "/blogs": [
        {
          text: "在vite中配置组件图标和接口的自动引入",
          link: "/blogs/在vite中配置组件图标和接口的自动引入",
        },
        {
          text: "如何在vue中优雅地使用sass",
          link: "/blogs/如何在vue中优雅地使用sass",
        },
        {
          text: "移动端及响应式适配",
          link: "/blogs/移动端及响应式适配",
        },
        {
          text: "token的前后端实现",
          link: "/blogs/token的前后端实现",
        },
        {
          text: "如何使用Github Page自动化部署VitePress",
          link: "/blogs/如何使用Github Page自动化部署VitePress",
        },
        {
          text: "前端中的权限控制",
          link: "/blogs/前端中的权限控制",
        },
        {
          text: "前端项目规范化流程",
          link: "/blogs/前端项目规范化流程",
        },
        {
          text: "路由过渡效果导致的闪烁bug解决",
          link: "/blogs/路由过渡效果导致的闪烁bug解决",
        },
        {
          text: "如何利用element来设置暗黑主题以及自定义主题",
          link: "/blogs/如何利用element来设置暗黑主题以及自定义主题",
        },
        {
          text: "如何使用nginx解决跨域问题",
          link: "/blogs/如何使用nginx解决跨域问题",
        },
        {
          text: "刷新页面导致动态路由丢失问题解决",
          link: "/blogs/刷新页面导致动态路由丢失问题解决",
        },
        {
          text: "优雅地在vue中使用本地svg图标",
          link: "/blogs/优雅地在vue中使用本地svg图标",
        },
        {
          text: "在组件中的js中控制css",
          link: "/blogs/在组件中的js中控制css",
        },
        {
          text: "在vite中使用环境变量",
          link: "/blogs/在vite中使用环境变量",
        },
        {
          text: "async和await的注意点",
          link: "/blogs/async和await的注意点",
        },
        {
          text: "Axios二次封装以及接口统一管理",
          link: "/blogs/Axios二次封装以及接口统一管理",
        },
        {
          text: "element-plus按需导入以及配置中文",
          link: "/blogs/element-plus按需导入以及配置中文",
        },
        {
          text: "vue3组件通信方法全总结",
          link: "/blogs/vue3组件通信方法全总结",
        },
        {
          text: "node版本管理工具对比",
          link: "/blogs/node版本管理工具对比",
        },
        {
          text: "Promise中的Error",
          link: "/blogs/Promise中的Error",
        },
        {
          text: "this指向解析",
          link: "/blogs/this指向解析",
        },
        {
          text: "vue3组件通信方法全总结",
          link: "/blogs/vue3组件通信方法全总结",
        },
      ],
      "/notes": [
        {
          text: "JavaScript",
          link: "/notes/JavaScript",
        },
        {
          text: "Vue",
          link: "/notes/Vue",
        },
        {
          text: "Vue3",
          link: "/notes/Vue3",
        },
        {
          text: "Sass",
          link: "/notes/Sass",
        },
        {
          text: "Axios",
          link: "/notes/Axios",
        },
        {
          text: "Promise",
          link: "/notes/Promise",
        },
      ],
    },
  },
  ignoreDeadLinks: true,
};

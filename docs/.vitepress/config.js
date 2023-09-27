export default {
  title: "LittlerXu",
  // base: "/~AI_2000870023/",
  themeConfig: {
    logo: "/NIUBI-removebg.png",
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Note",
        items: [
          { text: "JavaScript", link: "/note/JavaScript" },
          { text: "Vue", link: "/note/Vue" },
        ],
      },
      {
        text: "Project",
        link: "/note/JavaScript",
      },
      {
        text: "Other",
        link: "/note/JavaScript",
      },
      {
        text: "AboutMe",
        link: "/note/JavaScript",
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
        {
          text: "作业",
          items: [
            { text: "作业一", link: "/linux-school/assignment/assignment-1" },
            { text: "作业二", link: "/linux-school/assignment/assignment-2" },
            { text: "作业三", link: "/linux-school/assignment/assignment-3" },
            { text: "作业四", link: "/linux-school/assignment/assignment-4" },
            { text: "作业五", link: "/linux-school/assignment/assignment-5" },
          ],
          collapsible: true,
          collapsed: true,
        },
      ],
    },
  },
};

在vite中使用svg(vue)的步骤:

**安装SVG依赖插件**

```
pnpm install vite-plugin-svg-icons -D
```

**在`vite.config.ts`中配置插件**

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定svg图标文件夹位置
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
         // 执行icon name的格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
```

**在入口文件中导入**

```ts
//main.ts
import 'virtual:svg-icons-register'
```

**svg封装为全局组件**

因为项目很多模块需要使用图标,因此把它封装为全局组件！！！

在src/components目录下创建一个SvgIcon组件:

```vue
//src/components/SvgIcon/index.vue

<template>
      <!-- svg:图标外层容器节点,内部需要与use标签结合使用 -->
    <svg :style="{ width: width, height: height }">
        <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
        <!-- use标签fill属性可以设置图标的颜色 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: ""
  },
  //svg宽度
  width: {
    type: String,
    default: '16px'
  },
  //svg高度
  height: {
    type: String,
    default: '16px'
  }

})
</script>
<style scoped></style>
```

在src/components目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件！！！

**这也是vue3注册全局组件较优的方法:通过插件形式统一注册**

```ts
//src/components/index.ts

//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局对象
const allGloablComponent: any = { SvgIcon, Pagination, Category }
//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
    //将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
```

在入口文件引入src/index.ts文件,通过app.use方法安装自定义插件

```ts
//main.ts

import globalComponents from './components/index';
app.use(globalComponents);
```

在组件中使用SvgIcon全局组件:

```vue
<!-- App.vue -->
<template>
    <SvgIcon name="phone" color="red" width="100px" height="100px" />
</template>
```


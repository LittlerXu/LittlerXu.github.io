# element-plus按需导入以及配置中文
#### 一、安装

```bash
# NPM
npm install element-plus --save

# Yarn
yarn add element-plus --save

# pnpm
pnpm install element-plus --save
```

#### 二、引入

引入分为完整引入和按需引入,如果对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

**完整引入**

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型:

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

**按需引入**

推荐按需自动导入:

安装构建工具(vite/webpack)的插件:

```bash
npm install -D unplugin-vue-components
```

这个插件会在根目录中自动生成components.d.ts文件

>`unplugin-vue-components` 是一个用于 Vite 和 Webpack 的插件，它可以自动导入你在 Vue 模板中使用的组件，这样你就不需要在每个文件中手动导入它们。
>
>例如，如果你在 Vue 项目中使用这个插件，并且你有一个名为 `MyComponent.vue` 的组件，你可以直接在模板中使用这个组件，而不需要在 `script` 标签中导入它：
>
>```vue
><template>
>
><MyComponent />
>
></template>
>```
>
>在上面的代码中，`MyComponent` 是直接使用的，没有在 `script` 标签中导入。`unplugin-vue-components` 插件会自动为你导入 `MyComponent`。
>
>这个插件的主要优点是可以使你的代码更简洁，减少重复的导入语句。但是，它也可能使得代码的依赖关系不够明显，因此在使用时需要权衡。
>
>此外，`unplugin-vue-components` 还支持库如 Element Plus、Vuetify、Ant Design Vue 等的按需加载，可以有效减少最终构建的大小。
>
>`components.d.ts` 文件用于导出项目中使用的组件名称，以便在代码中实现自动导入和类型推断。它会将项目中的所有组件名称导出为一个类型声明的数组。

配置:

vite:

```json
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

webpack:

```json
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

>更多引入方式参照:
>
>[快速开始 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/guide/quickstart.html)
>
>[从实际项目深入理解ElementPlus的几种导入方式 - 掘金 (juejin.cn)](https://juejin.cn/post/7107247347901399047#heading-11)

#### 三、修改语言

element-plus的默认语言是英文, 需要将语言修改为中文:

完整引入:

```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
```

按需引入:

在App组件中引入zhCn,并将所有模板内容都写在el-config-provider标签中:

```vue
<template>
  <el-config-provider :locale="zhCn">
    <el-calendar v-model="value" />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'
const value = ref(new Date())
</script>
```

配置完毕可以测试element-plus组件与图标的使用.
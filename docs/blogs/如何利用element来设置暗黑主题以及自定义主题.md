在项目入口文件中引入element-plus暗黑模式样式：

```ts
// main.ts
import 'element-plus/theme-chalk/dark/css-vars.css'
```

创建一个开关来控制 `暗黑模式` 的 class 类名

暗色模式，只需在 html 上添加一个名为 `dark` 的类

```vue
<template>
	<el-switch inline-prompt v-model="dark" active-icon="MoonNight" inactive-icon="Sunny" @change="changeDark" />
</template>
<script setup lang="ts">
    //开关状态
let dark = ref(false)
//开关状态改变回调
const changeDark = (val: boolean) => {
    if (val) {
//暗黑模式
document.documentElement.classList.add('dark')
    } else {
//非暗黑模式 document.documentElement.classList.remove('dark')
    }
}
</script>
```

## 切换主题

为`<Html>`标签修改样式`--el-color-primary`即可.

```ts
const setColor = (val: string) => {
    document.documentElement.style.setProperty('--el-color-primary', val)
}
```


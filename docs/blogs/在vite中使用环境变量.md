# 在vite中使用环境变量
#### 什么是环境变量

 根据当前的代码环境变化的变量就叫做**环境变量**。比如，在**生产环境**和**开发环境**将BASE_URL设置成不同的值，用来请求不同的环境的接口。

#### vite中如何使用环境变量

在项目根目录下创建`env`文件夹, 并在`env\`目录中新建三个环境变量文件:

.env.development
.env.production
.env.test

文件内容:

```
# .env.development
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

```
# .env.production
NODE_ENV = 'production'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/prod-api'
```

```
# .env.test
NODE_ENV = 'test'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/test-api'
```

在package.json中配置.env文件位置:

`envDir`配置项用于加载.env文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

```json
import { defineConfig } from "vite";
export default defineConfig( {
  envDir:"env"
});
```



**通过import.meta.env.xxx获取环境变量**

配置运行命令：package.json

```
 "scripts": {
    "dev": "vite dev",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "build:test": "vue-tsc && vite build --mode test",
  },
```

vite默认dev命令使用devement环境, build命令使用production环境.

`--mode <环境变量文件名称>`可以覆盖默认使用的环境.



vite环境变量详细设置参见:

[vite中环境变量的使用与配置（非常详细） - 掘金 (juejin.cn)](https://juejin.cn/post/7172012247852515335)

[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](
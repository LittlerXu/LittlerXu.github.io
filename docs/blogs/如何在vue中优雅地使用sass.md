# 如何在vue中优雅地使用sass
安装所需的包:

- webpack构建的vue项目:

  1. `sass-loader`：这个包是 webpack 的一个加载器，用于将 SCSS 文件转换为 CSS。
  2. `sass`：这个包是 Dart Sass，是最新版本的 Sass 编译器，用于编译 SCSS 文件。

  ```bash
  pnpm install --save-dev sass-loader sass
  ```

- vite构建的vue项目:

  Vite 已经内置了对 SCSS 的支持，只需要安装`sass`即可.

  ```bash
  pnpm install --save-dev sass
  ```

Scss目录结构设计:

```
.--scss
  --index.scss 入口文件
  --reset.scss 清除默认样式
  --base.scss 基础全局样式
  --variable.scss 全局scss变量
  --mixin.scss 全局scss混入
```

在`index.scss`文件中导入`reset.scss`和`base.scss`

```scss
//index.scss
@import 'reset.scss'
@import 'base.scss'
```

然后在`main.js`中引入`index.scss`文件

```js
//引入全局样式文件
import '@/styles/index.scss'
```

为了使定义的全局scss变量和混入可以在任意组件中使用需要在构建工具中配置:

vite:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/variable.scss";
        @import "./src/style/mixin.scss";`
      }
    }
  }
})
```

webpack:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "./src/styles/variable.scss";',
            },
          },
        ],
      },
    ],
  },
}
```



scss完整配置项及其作用:

- `additionalData`：在每个处理的 SCSS 文件的内容之前，添加一些内容。例如，你可以使用它来自动导入一些全局的 SCSS 变量或 mixin。
- `includePaths`：指定一些路径，Sass 编译器会在这些路径中查找 `@import` 的文件。这可以让你更方便地导入 SCSS 文件，而无需写出完整的相对路径。
- `sourceMap`：是否生成 source map。source map 可以帮助你在开发工具中更方便地调试 SCSS 代码。
- `outputStyle`：控制生成的 CSS 代码的格式。可选的值有 `'expanded'` 和 `'compressed'`。

示例:

vite:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variable.scss";`,
        includePaths: ['./src/styles'],
        sourceMap: true,
        outputStyle: 'expanded'
      }
    }
  }
})
```

webpack:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                includePaths: ['./src/styles'],
              },
              additionalData: '@import "./src/styles/variable.scss";',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
}
```

这个配置会在每个 SCSS 文件的内容之前添加 `@import "./src/styles/variable.scss";` 这行代码，同时还会在 `./src/styles` 路径中查找 `@import` 的文件，并生成 source map。生成的 CSS 代码的格式为 `'expanded'`。
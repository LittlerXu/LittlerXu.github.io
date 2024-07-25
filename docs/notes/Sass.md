
# Sass
## sass编译为css

sass编译为css有很多种方法, 最简单的方法是使用vscode插件:*Live Sass Compiler*

*Live Sass Compiler*常用配置:

```json

    // 设置 Live Sass Compile 插件的格式化选项
    "liveSassCompile.settings.formats": [

            //nested - 嵌套格式
            //expanded - 展开格式
            //compact - 紧凑格式
            //compressed - 压缩格式
            "format": "expanded",
            //设置编译而成的css文件后缀名
            "extensionName": ".css",
            "savePath": null,
            //设置编译而成的css文件位置
            // null表示与scss文件同一目录,
            // /表示相对于根
            // ~相对于每个sass文件
            "savePathReplacementPairs": null

    ],
    // 是否生成 Sass 编译的源映射文件map文件
"liveSassCompile.settings.generateMap": false,
    //控制何时显示插件的输出窗口
    //Error表示编译时发生错误才显示输出窗口
"liveSassCompile.settings.showOutputWindowOn": "Error",
    // 在打开项目时自动启动 Live Sass Compile 插件的监视
"liveSassCompile.settings.watchOnLaunch": true,

```



## 注释

Sass支持两种注释

1.标准的css多行注释 `/* ... */`会编译到.css文件中

2.单行注释`//`不会编译到.css文件中

例如：

![image-20240228195120632]Sass.assets/image-20240228195120632.png

当多行注释出现在原生`css`不允许的地方，如在`css`属性或选择器中，`sass`将不知如何将其生成到对应`css`文件中的相应位置，于是这些注释被抹掉。

```scss
body
  color /* 这块注释内容不会出现在生成的css中 */: #333;
  padding: 1; /* 这块注释内容也不会出现在生成的css中 */ 0;

```

## sass嵌套规则

https://www.sass.hk/guide/#:~:text=%E8%A7%84%E5%88%99%E5%B5%8C%E5%A5%97%E3%80%82-,2.%20%E5%B5%8C%E5%A5%97CSS%20%E8%A7%84%E5%88%99%3B,-css%E4%B8%AD%E9%87%8D%E5%A4%8D

## 变量

### 变量定义规则

1、变量以美元符号$开头，后面跟变量名；

2、变量名是不以数字开头的可包含字母、数字、下划线、中划线的标识符；

3、变量名和值之间用冒号:分隔；

4、变量一定要先定义，后使用.

### 变量名用中划线还是下划线分隔

通过中划线与下划线分隔的同名变量为同一变量，建议使用中划线

![image-20240228195734980]Sass.assets/image-20240228195734980.png

### 变量数据类型

· 数值 有无单位数值和有单位数值`1, 0.5, 10px, 30%`

· 字符串 有引号字符串与无引号字符串 `"foo", 'bar', baz`

· 颜色 `blue, #04a3f9, rgba255,0,0,0.5`

· 布尔值 `true, false`

· null 值null是null型的唯一值。它表示缺少值，通常由函数返回以指示缺少结果 `null`

· 数组 用空格或逗号作分隔符`1.5em 1em 0 2em, Helvetica,Arial,sans-serif`

· maps, 相当于 JavaScript 的 object，`key1: value1, key2: value2`

[数据类型详情]https://www.sass.hk/docs/#:~:text=6.3.%20%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%20Data%20Types

### 变量默认值

反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。

```scss
$link-color: blue;
$link-color: red;
a
color: $link-color;

```

使用`!default`来定义变量的默认值,如果这个变量被声明赋值在默认值之前或之后都可了，那就用它声明的值，否则就用这个默认值。

```scss
$color:#333;
// 如果$color没被声明赋值就使用如下的默认值
$color:#666 !default;
.container
    border-color: $color;

```

假如你写了一个可被他人通过`@import`导入的`sass`库文件，你可能希望导入者可以定制修改`sass`库文件中的某些值,这时变量默认值就很有用.

### 局部变量和全局变量

#### 局部变量

在任何形式的`...`块内定义的变量，只能在选择器范围内使用

任何形式的`...`块包括: 规则块、`@media`或者`@font-face`块

```scss
.container
  $font-size:14px;
  font-size: $font-size;

```

如果这样用就不行

```scss
.container
  $font-size:14px;
  font-size: $font-size;

.footer
  font-size: $font-size;

```

#### 全局变量

定义后能全局使用的变量

第一种：在选择器外面的最前面定义的变量

```scss
$font-size:16px;
.container
  font-size: $font-size;

.footer
  font-size: $font-size;

```

第二种：使用 !global 标志定义全局变量

```scss
.container
  $font-size:16px !global;
  font-size: $font-size;

.footer
  font-size: $font-size;

```

## 运算符

**+、-、%运算符**

+、-运算符遇到带有单位的数值时, 会自动进行单位转换,前后数值都带有单位则统一转换为前面数值的单位.

![image-20240301210150516]Sass.assets/image-20240301210150516.png

百分数只能与不带单位的数值或者百分数进行+、-运算,与带单位的数值进行+、-运算会报错.

![image-20240301210409787]Sass.assets/image-20240301210409787.png

**\*运算符**

\*运算符两边必须有一个为纯数字作为倍数.

![image-20240301210719308]Sass.assets/image-20240301210719308.png

**/运算符**

`/`同时起除法运算和分隔数字的作用, 在以下三种情况 `/` 将被视为除法运算符号：

- 如果值，或值的一部分，是变量或者函数的返回值
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分

![image-20240301211113531]Sass.assets/image-20240301211113531.png

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#` 插值语句将变量包裹。

![image-20240301211201209]Sass.assets/image-20240301211201209.png

/运算符两边的值必须带有相同的单位, 或者都为纯数字或者百分数. 运算结果为纯数字.

![image-20240301211604711]Sass.assets/image-20240301211604711.png

**字符串运算**

`+` 可用于连接字符串,如果有引号字符串（位于 `+` 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 `+` 左侧）连接有引号字符串，运算结果则没有引号。以左为准

![image-20240301212517645]Sass.assets/image-20240301212517645.png

## 插值语句

通过 `#` 插值语句可以在选择器、属性名、属性值、字符串和注释中使用变量或运算.

![image-20240301213912935]Sass.assets/image-20240301213912935.png

在属性值中使用插值语句不如直接使用变量,通常在属性值中使用插值语句是为了将`/`当做数字分隔符而非除运算符.

## 导入

### 语法

Sass使用`@import`来导入SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 mixin 都可以在导入的文件中使用。

```scss
//public.scss
$font-base-color:#333;
```

```scss
//Index.sass
@import "public";
$color:#666;
.container
  border-color: $color;
  color: $font-base-color;

```

编译后：

```scss
.container  border-color: #666; color: #333;
```



使用`sass`的`@import`规则并不需要指明被导入文件的全名。你可以省略`.sass`或`.scss`文件后缀（见下图）。这样，在不修改样式表的前提下，你完全可以随意修改你或别人写的被导入的`sass`样式文件语法，在`sass`和`scss`语法之间随意切换。举例来说，`@import"sidebar"`这条命令将把`sidebar.scss`文件中所有样式添加到当前样式表中。

### 局部文件

那些专门为`@import`命令而编写的`sass`文件，并不需要生成对应的独立`css`文件，这样的`sass`文件称为局部文件。对此，`sass`有一个特殊的约定来命名这些文件:

`sass`局部文件的文件名以下划线开头。这样，`sass`就不会在编译时单独编译这个文件输出`css`，而只把这个文件用作导入。

当你`@import`一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入`themes/_night-sky.scss`这个局部文件里的变量，你只需在样式表中写`@import "themes/night-sky";`。

这也就意味着，同一个目录下不能同时出现两个相关名的sass文件（一个不带\_，一个带_），添加下划线的文件将会被忽略。

### 嵌套导入

跟原生的`css`不同，`sass`允许`@import`命令写在`css`规则内。这种导入方式下，生成对应的`css`文件时，局部文件内容会被直接插入到`css`规则内导入它的地方。

举例说明，有一个名为`_blue-theme.scss`的局部文件，内容如下：

```scss
aside
  background: blue;
  color: white;

```

然后把它导入到一个CSS规则内，如下所示：

```scss
.blue-theme @import "blue-theme"

//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。

.blue-theme
  aside
    background: blue;
    color: #fff;


```

被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。这些变量和混合器不会全局有效，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。

### 原生的CSS导入

在下列三种情况下会生成原生的`CSS@import`，尽管这会造成浏览器解析`css`时的额外下载：

- 被导入文件的名字以`.css`结尾；
- 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
- 被导入文件的名字是`CSS`的url值。

这就是说，你不能用`sass`的`@import`直接导入一个原始的`css`文件，因为`sass`会认为你想用`css`原生的`@import`。但是，因为`sass`的语法完全兼容`css`，所以你可以把原始的`css`文件改名为`.scss`后缀，即可直接导入了。

## 混入

mixin是可以重用的一组CSS声明,有助于减少重复代码.

### 只包含样式属性的混入

 ![image-20240229090544687]Sass.assets/image-20240229090544687.png

### 含有`css`规则的混入

![image-20240229090942215]Sass.assets/image-20240229090942215.png

如果一个混合器只包含`css`规则，不包含属性，那么这个混合器就可以在文档的顶部调用，写在所有的`css`规则之外。

### 带参数的混入

#### 单参数

```scss
//单参数混入
@mixin flex-align$aitem
    -webkit-box-align: $aitem;
    -webkit-align-items: $aitem;
    -ms-flex-align: $aitem;
    align-items: $aitem;



// 只有一个参数，直接传递参数
.container
    @include flex-aligncenter;

// 指定参数名传参
.footer
    @include flex-align$aitem: center;

```

#### 多参数

```scss
//多参数混入
@mixin block-padding$top, $right, $bottom, $left
    padding-top: $top;
    padding-right: $right;
    padding-bottom: $bottom;
    padding-left: $left;


//按照参数顺序传参
.container
    @include block-padding10px, 20px, 30px, 40px;

//指定参数名传参
.container
    @include block-padding$left: 20px, $top: 10px, $bottom: 10px, $right: 30px;

```

#### 参数默认值

```scss
//参数默认值
@mixin block-padding$top: 0, $right: 0, $bottom: 0, $left: 0
    padding-top: $top;
    padding-right: $right;
    padding-bottom: $bottom;
    padding-left: $left;


.container
    //不传参,全部使用默认值
    @include block-padding;

    //按顺序传参,没传的参数使用默认值
    @include block-padding10px,20px;

    //指定参数名传参,没传的参数使用默认值
    @include block-padding$left: 10px, $top: 20px

```

 #### 可变参数

参数个数不固定

```scss
/**
  *定义线性渐变
  *@param $direction  方向
  *@param $gradients  颜色过度的值列表
 */
@mixin linear-gradient$direction, $gradients...
    background-color: nth$gradients, 1;
    background-image: linear-gradient$direction, $gradients;



//可变参数传递任意多个值
.table-data
    @include linear-gradientto right, #F00, orange, yellow;

```

编译结果:

![image-20240229092141606]Sass.assets/image-20240229092141606.png

## 继承

### 语法

继承全称为"选择器继承",指的是一个选择器可以继承为另一个选择器定义的所有样式。这个通过`@extend`语法实现，如下代码:

```scss
//通过选择器继承继承样式
.error
  border: 1px solid red;
  background-color: #fdd;

.seriousError
  @extend .error;
  border-width: 3px;

```

`.seriousError`不仅会继承`.error`自身的所有样式，任何包含`.error`的组合选择器样式也会被`.seriousError`以组合选择器的形式继承

![image-20240301201628751]Sass.assets/image-20240301201628751.png

### 原理

`@extend`背后最基本的想法是，如果`.seriousError @extend .error`， 那么样式表中的任何一处`.error`都用`.error``.seriousError`这一选择器组进行替换。

### 最佳实践

只能继承"单选择器",可以是后代或组合选择器中包含的单选择器,但不能继承后代和组合选择器整体.

![image-20240301202311206]Sass.assets/image-20240301202311206.png

![image-20240301202350949]Sass.assets/image-20240301202350949.png

不要用后代选择器去继承, 如果这么做的同时被继承的选择器包含在后代或组合选择器时，生成`css`中的选择器有可能会不直观或数量失控.

![image-20240301202920880]Sass.assets/image-20240301202920880.png

### 同时继承多个选择器

![image-20240301203216355]Sass.assets/image-20240301203216355.png

### 多层继承

![image-20240301203335714]Sass.assets/image-20240301203335714.png

### 占位符选择器

Sass 额外提供了一种特殊类型的选择器：占位符选择器 placeholder selector。与常用的 id 与 class 选择器写法相似，只是 `#` 或 `.` 替换成了 `%`。

占位符选择器仅用于扩展其他选择器，不会被编译成最终的CSS。

![image-20240301204137762]Sass.assets/image-20240301204137762.png

### 与混合器比较

- 跟混合器相比，继承生成的`css`代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的`css`体积更小。如果你非常关心你站点的速度，请牢记这一点。
- 继承遵从`css`层叠的规则。当两个不同的`css`规则应用到同一个`html`元素上时，并且这两个不同的`css`规则对同一属性的修饰存在不同的值，`css`层叠规则会决定应用哪个样式。

混合器本身不会引起`css`层叠的问题，因为混合器把样式直接放到了`css`规则中，而继承存在样式层叠的问题。

## 流程控制指令

### @if

当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `` 内的代码.

语法方式同js的if....else if ...else

```scss
.container
    // 第一种
    @if
        /* 条件 */

        // ...


    // 第二种
    @if
        /* 条件 */

        // ...

    @else
        // ...


    // 第三种
    @if
        /* 条件 */

        // ...

    @else if
        // ...

    @else
        // ...


```

示例:定义一个css的三角形@mixin声明

```scss
@mixin triangle$direction: top, $size: 30px, $border-color: blue
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: $size;
    border-#$direction-width: 0;

    @if $direction ==top
        border-color: transparent transparent $border-color transparent;
        border-style: dashed dashed solid dashed;

    @else if$direction ==right
        border-color: transparent transparent transparent $border-color;
        border-style: dashed dashed dashed solid;

    @else if$direction ==bottom
        border-color: $border-color transparent transparent transparent;
        border-style: solid dashed dashed dashed;

    @else
        border-color: transparent $border-color transparent transparent;
        border-style: dashed solid dashed dashed;



//使用
.p0
    @include triangle;

.p1
    @include triangleright, 50px, red;

.p2
    @include trianglebottom, 50px, white;

.p3
    @include triangleleft, 50px, green;

```

效果:

![img]Sass.assets/wps1.jpg

### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from start through end`，或者 `@for $var from start to end`，区别在于 `through` 与 `to` 的含义：*当使用 `through` 时，条件范围包含 `start` 与 `end` 的值，而使用 `to` 时条件范围只包含 `start` 的值不包含 `end` 的值*。另外，`$var` 可以是任何变量，比如 `$i`；`start` 和 `end` 必须是整数值。

`from` 与 `through`

![image-20240301223814827]Sass.assets/image-20240301223814827.png

`from` 与 `to`

![image-20240301223629291]Sass.assets/image-20240301223629291.png

### @each

`@each` 指令的格式是 `$var in list`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `list` 是一连串的值，也就是值列表。

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果.

![image-20240301224017162]Sass.assets/image-20240301224017162.png

### @while

`@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。

![image-20240301224428834]Sass.assets/image-20240301224428834.png

### 三元条件函数if

```scss
if$condition,$if-true,$if-false;
```

判断\$condition，如果条件成立，则返回\$if-true的结果，如果条件不成立，则返回$if-false的结果。

![image-20240301224835891]Sass.assets/image-20240301224835891.png

## 函数

### 自定义函数

#### 定义函数

```scss
@function function-name[$param1,$param2,...]
	...
	@return $value;

```

提示：函数名function-name 与function_name 是相同的

#### @return

它只允许在@函数体中使用，并且每个@function必须以@return结束。当遇到@return时，它会立即结束函数并返回其结果。

#### 调用函数

例如：

```scss
@function row-cols-width$column
    @return percentage1 / $column;


@for $i from 1 through 6
    .row-cols-#$i*
        width: row-cols-width$i;


```



#### 函数的参数与默认值

**与函数的参数及传参一致**

```scss
/**
    *定义线性渐变
    *@param $direction  方向
    *@param $gradients  颜色过度的值列表
 */

@function background-linear-gradient$direction, $start-color, $end-color:blue
    @return linear-gradient$direction, $start-color, $end-color;

```

顺序传参:

```scss
.header
    background-image: background-linear-gradientto right, red, green;

```

省略默认值:

```scss
.header
    background-image: background-linear-gradientto right, red;

```

指定参数名传参:

```scss
.header
    background-image: background-linear-gradient$start-color: red, $direction: to bottom;

```

注意：函数参数默认值可以是任意SassScript表达式，甚至可以引用前面的参数

#### 可变参数

```scss
/**
    *定义线性渐变
    *@param $direction  方向
    *@param $gradients  颜色过度的值列表
 */

@function background-linear-gradient$direction, $gradients...
    @return linear-gradient$direction, $gradients;


.header
    background-image: background-linear-gradientto bottom, red, green, blue;

```

调用函数传递可变参数:

```scss
$widths: 50px,30px,100px;
.logo
    width: min$widths...;

```



#### 混入mixin和函数function的区别

- 混入mixin主要是通过传递参数的方式输出多样化的样式，为了可以现实代码**复用**。
- 函数的功能主要是通过传递参数后，经过函数内部的计算，最后@return输出一个值。

### 内置函数

[Scss常见函数的基本使用][第十三讲 sass 常见函数的基本使用_哔哩哔哩_bilibili]https://www.bilibili.com/video/BV1Ci4y1d74K?p=13&vd_source=2338fda5892f8a962e39f2e0fb4667dd

[完整函数列表][Sass: Built-In Modules sass-lang.com]https://sass-lang.com/documentation/modules/

## 模块化

### @use

[视频教程][第二十一讲 SASS @use的使用_哔哩哔哩_bilibili]https://www.bilibili.com/video/BV1Ci4y1d74K?p=21&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd

#### 作用

从其他Sass样式表加载mixin，function和变量，并将来自多个样式表的CSS组合在一起，@use加载的样式表被称为“模块”，多次引入只包含一次。

@use也可以看作是对@import的增强

#### 语法

```scss
@use 'url' [as alias|namespace]
```

#### 加载普通SCSS、CSS

use下面的_common.scss

```scss
$font-size:14px !default;
*
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;


@function column-width$col, $total
    @return percentage$col/$total;


@mixin bgColor$bg-color:#f2f2f2
    background-color: $bg-color;

```

use下面的about.css

```css
h1
    font-size: 24px;

```

使用

```scss
@use 'use/common';
@use 'use/about';
```



#### 加载模块

新增_global.scss

```scss
$font-size:28px;
@mixin base$color:#F00
    color: $color;


.gclass
    background-color: #F00;

```

###### @import的方式

```scss
@import 'use/common';
@import 'use/global';
@import 'use/global';
body
    font-size: $font-size;
    @include base'#FFF';
    @include base'#000';
    width: column-width3, 12;
    @include bgColor'#F00';

```

##### @use的方式

```scss
@use 'use/common';
@use 'use/global' as g1;
@use 'use/global' as g2;
body
    font-size: common.$font-size;
    @include g1.base'#FFF';
    @include g2.base'#000';
    width: common.column-width3, 12;
    @include common.bgColor'#F00';

```

 通过@use引入的样式默认把文件名作为模块名使用，你可以通过as的形式重新取一个别名

##### @use取消别名

可能@use "url" as * 来取消命名空间，这种方式加载的模块被提升为全局模块

注意：这种方式慎用

```scss
@use 'use/common';
@use 'use/global' as *;
@use 'use/global' as g2;
body
    font-size: $font-size;
    @include base'#FFF';
    @include g2.base'#000';
    width: common.column-width3, 12;
    @include common.bgColor'#F00';

```



#### 定义私有成员

如果加载的模块内部有变量只想在模块内使用，可使用-或_定义在变量头即可

例如：

```scss
$-font-size:14px;
*
    margin: 0;
    padding: 0;
    font-size: $-font-size;
    color: #333;

```

```scss
@use 'use/common';
@use 'use/global' as *;
@use 'use/global' as g2;
body
    font-size: common.$-font-size;		// 报错 Error: Private members can't be accessed from outside their modules.
    @include base'#FFF';
    @include g2.base'#000';

```



#### 定义默认值

##### 通过！default能变量定义默认值

```scss
$font-size:14px !default;
*
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;

```

##### @use引入时可通过with...修改默认值

```scss
@use 'use/common' with  $font-size:16px, ;
@use 'use/global' as *;
@use 'use/global' as g2;
common.$font-size:28px; // 也可能通过这种方式覆盖
body
    font-size: common.$font-size;
    @include base'#FFF';
    @include g2.base'#000';

```



#### 默认加载index.scss

创建_index.scss

```scss
@use 'common' with  $font-size:16px, ;
@use 'global' as *;
@use 'global' as g2;
common.$font-size:28px; // 也可能通过这种方式覆盖
body
    font-size: common.$font-size;
    @include base'#FFF';
    @include g2.base'#000';

```

使用

```scss
@use 'use/index';
```



#### @use使用总结

- @use引入同一个文件多次，不会重复引入，而@import会重复引入
- @use引入的文件都是一个模块，默认以文件名作为模块名，可通过as alias取别名
- @use引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问，而@import变量会被覆盖
- @use方式可通过 @use 'xxx' as *来取消命名空间，建议不要这么做
- @use模块内可通过$- 或$_来定义私有成员，也就是说_或者-开头的Variables mixins functions 不会被引入
- @use模块内变量可通过！default 定义默认值，引入时可通用with（...）的方式修改
- 可定义-index.scss或_index.scss来合并多个scss文件，它@use默认加载文件

### @forward

[视频教程][第二十三讲 SASS @forward的使用_哔哩哔哩_bilibili]https://www.bilibili.com/video/BV1Ci4y1d74K?p=23&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd

#### 作用

通过 `@forward`加载一个模块的成员，并将这些成员当作自己的成员对外暴露出去，类似于类似于 es6 的 export ...，通常用于跨多个文件组织 Sass 库

#### 转发、合并scss

##### 转发

创建forward/_common.scss

```scss
$font-size:14px !default;
*
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;


@function column-width$col, $total
    @return percentage$col/$total;


@mixin bgColor$bg-color:#f2f2f2
    background-color: $bg-color;

```

创建启动合并bootstrap.scss

```scss
@forward 'uses/common';
```

使用

```scss
@use 'bootstrap';
.body
    font-size: bootstrap.$font-size;
    width: bootstrap.column-width3, 12;
    @include bootstrap.bgColor'#F00';

```

##### 合并

新增一个_global.scss

```scss
$font-size:28px;
@mixin base$color:#F00
    color: $color;


.gclass
    background-color: #F00;

```

统一转发

```scss
@forward 'uses/common';
@forward 'uses/global';
```

使用

```scss
@use 'bootstrap';
.body
    font-size: bootstrap.$font-size;
    width: bootstrap.column-width3, 12;
    @include bootstrap.bgColor'#F00';
    @include bootstrap.base'#000';

```

**问题：**当多个被转发的文件存在相同变量、函数、混入时会有问题

#### 选择性转发

默认情况下，`@forward` 会将一个模块中所有成员都转发，如果只想转发某些成员，当你不想转发所有变量、函数、混入时，可使用

- `@forward "module" hide $var, mixinName, fnName` 禁止转发某些成员
- `@forward "module" show $var, mixinName, fnName` 只转发某些成员

各个成员通过逗号 `,` 分隔开，如果成员是变量，不能省略 `$` 符号。

```scss
@forward 'uses/common' as com-* hide com-bgColor,$com-font-size;
@forward 'uses/global' as glob-* show base;
```

使用

```scss
@use 'bootstrap';
.body
    font-size: bootstrap.$com-font-size;
    width: bootstrap.com-column-width3, 12;
    @include bootstrap.com-bgColor'#000';
    @include bootstrap.glob-base'#000';

```



#### 转发时定义前缀

@forward "url" as prefix-*

bootstrap.scs

```scss
@forward 'uses/common' as com-*;
@forward 'uses/global' as glob-*;
```

使用

```scss
@use 'bootstrap';
.body
    font-size: bootstrap.$com-font-size;
    width: bootstrap.com-column-width3, 12;
    @include bootstrap.com-bgColor'#F00';
    @include bootstrap.glob-base'#000';

```





#### 转发时配置模块的成员

bootstarp

```scss
@forward 'uses/common' as com-* with  $font-size:30px !default;
@forward 'uses/global' as glob-* show glob-base;
```

使用

```scss
@use 'bootstrap' with $com-font-size:50px;
.body
    font-size: bootstrap.$com-font-size;
    width: bootstrap.com-column-width3, 12;
    @include bootstrap.com-bgColor'#000';
    @include bootstrap.glob-base'#000';

```

#### @use与@forward一起使用的情况

当一个模块里面须要同时使用@use与@forward时，建议先使用@forwar后再使用@use

```scss
@use 'uses/code';
@forward 'uses/common' as com-*;
@forward 'uses/global' as glob-* show glob-base;
@use 'use/common' as c1;
.test
    font-size: c1.$font-size;
    color: code.$color;

```

## @at-root

[视频教程][第二十四讲 SASS @at-root的使用_哔哩哔哩_bilibili]https://www.bilibili.com/video/BV1Ci4y1d74K?p=24&spm_id_from=pageDriver&vd_source=2338fda5892f8a962e39f2e0fb4667dd

### 作用

@at-root可以使被嵌套的选择器或属性跳出嵌套

### 语法

```css
@at-root selector
	...

```

### 普通嵌套

```scss
.parent
    font-size: 12px;
    .child
        font-size: 14px;
        .son
            font-size: 16px;



```

#### 作用某个选择器使其跳出嵌套

```scss
.parent
    font-size: 12px;
    @at-root .child
        font-size: 14px;
        @at-root .son
            font-size: 16px;



```

#### 作用某些选择器使其跳出嵌套

```scss
.parent
    font-size: 12px;
    @at-root
        .child-1
            font-size: 14px;

        .child-2
            font-size: 16px;



```

### @at-root与&的结合使用

&的使用

```scss
.foo
    & .bar
        color: gray;



.foo
    &
        color: gray;



.foo
    .bar &
        color: gray;


```

这跟前面加@at-root效果是一样的

### 使用@at-root结合#&实现BEM效果

理解BEM：https://zhuanlan.zhihu.com/p/122214519

官网学习：https://en.bem.info/methodology/quick-start/

BEM完整命名规则：block-name__element-name--modifier-name  也可以换成驼峰式命名

官方网站最新推出：block-name__element-name_modifier-name

比较BEM的一则样式

```scss
.blockwidth: 1000px;
.block__elementfont-size: 12px;
.block--modifierfont-size: 14px;
.block__element--modifierfont-size: 16px;
```

实现

```scss
.block
    width: 1000px;
    @at-root #&__element
        font-size: 12px;
        @at-root #&--modifier
            font-size: 16px;


    @at-root #&--modifier
        font-size: 14px;



//或

.block
    width: 1000px;
    @at-root
        #&__element
            font-size: 12px;
            @at-root #&--modifier
                font-size: 16px;


        #&--modifier
            font-size: 14px;




// 实现上也能直接用&实现
.block
    width: 1000px;
    &__element
        font-size: 12px;
        &--modifier
            font-size: 16px;


    &--modifier
        font-size: 14px;


```

### @at-root without: …和@at-root with: …的使用

默认@at-root只会跳出选择器嵌套，而不能跳出@media或@support，如果要跳出这两种，则需使用@at-root without: media，@at-root without: support。这个语法的关键词有四个：

1、all（表示所有）
2、rule（表示常规css）
3、media（表示media）
4、supports（表示supports）

演示

```scss
@media screen
    .parent
        font-size: 12px;
        @at-root without: media
            .child
                font-size: 14px;
                .son
                    font-size: 16px;





```

```scss
@supports display: flex
    .parent
        font-size: 12px;
        @at-root with: supports
            .child
                font-size: 14px;
                .son
                    font-size: 16px;





```


案例简单演示@at-root的用法

html

```html
!DOCTYPE html
html lang="en"

head
    meta charset="UTF-8"
    meta http-equiv="X-UA-Compatible" content="IE=edge"
    meta name="viewport" content="width=device-width, initial-scale=1.0"
    title演示@at-root的用法/title
    link rel="stylesheet" href="css/test.css"
/head

body
    !-- 头部 --
    header class="header"
        div class="logo"logo/div
        form class="search-form"
            div class="content"
                input class="input" placeholder="搜索内容"
                button class="button"搜索/button
            /div
        /form
    /header
    !-- 中间 --
    div class="center"/div
    !-- 底部 --
    footer class="footer"/footer
/body

/html
```

简单的test.scss

```scss
body
    margin: 0;
    padding: 0;
    width: 750px;
    max-width: 750px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100vh;


.header
    background-color: aquamarine;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    @at-root .logo
        font-size: 36px;
        margin-right: 30px;

    .search-form
        .content
            display: flex;
            align-items: center;
            .input
                padding: 4px 10px;
                margin-right: 10px;

            .button
                border: none;
                background-color: cadetblue;
                color: #FFF;
                height: 28px;
                width: 60px;





.center
    flex: 1;
    background-color: black;


.footer
    height: 200px;
    background-color: burlywood;

```

## 在Vue中使用Scss

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
import  defineConfig  from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig
  css:
    preprocessorOptions:
      scss:
        additionalData: `@import "./src/style/variable.scss";
        @import "./src/style/mixin.scss";`




```

webpack:

```js
// webpack.config.js
module.exports =
  module:
    rules: [

        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',

            loader: 'sass-loader',
            options:
              additionalData: '@import "./src/styles/variable.scss";',
            ,
          ,
        ],
      ,
    ],
  ,

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
import  defineConfig  from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig
  plugins: [vue],
  css:
    preprocessorOptions:
      scss:
        additionalData: `@import "./src/styles/variable.scss";`,
        includePaths: ['./src/styles'],
        sourceMap: true,
        outputStyle: 'expanded'




```

webpack:

```js
// webpack.config.js
module.exports =
  module:
    rules: [

        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',

            loader: 'sass-loader',
            options:
              sassOptions:
                outputStyle: 'compressed',
                includePaths: ['./src/styles'],
              ,
              additionalData: '@import "./src/styles/variable.scss";',
              sourceMap: true,
            ,
          ,
        ],
      ,
    ],
  ,

```

这个配置会在每个 SCSS 文件的内容之前添加 `@import "./src/styles/variable.scss";` 这行代码，同时还会在 `./src/styles` 路径中查找 `@import` 的文件，并生成 source map。生成的 CSS 代码的格式为 `'expanded'`。
# Axios


## 概述

### Axios 是什么?

Axios 是一个基于 *[promise](https://javascript.info/promise-basics)* 网络请求库，作用于[`node.js`](https://nodejs.org/) 和浏览器中。 它是 *[isomorphic](https://www.lullabot.com/articles/what-is-an-isomorphic-application)* 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests

### 特性

- 从浏览器创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### 安装和引入

使用 npm:

```bash
$ npm install axios
```

在项目中引入:

```js
import axios from 'axios'
```



## 基本使用

### 基本使用

向`axios()`传递相关配置来创建请求:

**axios(config)**

```js
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```

**axios(url[, config])**

```js
// 发起一个 GET 请求 (默认请求方式)
axios('/user/12345');
```

### 请求方式别名

为了方便起见，已经为所有支持的请求方法提供了别名。

axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.options(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])

>注意
>
>在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定。

### 请求配置

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。

如果没有指定 `method`，请求将默认使用 `GET` 方法。

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer`是可选方法，主要用于序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject状态的 promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```

### 响应结构

`axios()`以及`axios.<请求方法>()`返回的都是一个**Promise**,solve()的参数为response对象, 里面是关于响应的相关内容

respnse对象如下:

```json
{
  //响应体
  data: {},

  // 状态码
  status: 200,

  // 状态文本
  statusText: 'OK',

  // 响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // 引发此响应的`axios` 请求的配置信息
  config: {},

  // 引发此响应的请求对应的原生对象
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

当使用 `then` 时，将接收如下响应:

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

当使用 `catch`，或者传递一个[rejection callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)作为 `then` 的第二个参数时，响应可以通过 `error` 对象被使用，正如在[错误处理](https://www.axios-http.cn/docs/handling_errors)部分解释的那样。







## Axios 实例

`axios()`函数是`Axios`构造函数的一个实例对象,继承了Axios原型对象上的属性和方法

### axios.create([config])

Axios原型对象上有一个create(config)方法,用来生成一个新的Axios实例对象

配置对象config中有三个属性:

`baseURL` 基础路径

`timeout` 请求超时时间

`headers` 请求头配置对象

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

### 实例方法

以下是可用的实例方法。指定的配置将与实例的配置合并。

axios#request(config)

axios#get(url[, config])

axios#delete(url[, config])

axios#head(url[, config])

axios#options(url[, config])

axios#post(url[, data[, config]])

axios#put(url[, data[, config]])

axios#patch(url[, data[, config]])

axios#getUri([config])



## 默认配置

Axios.defaults对象用于修改Axios实例的默认配置.

defaults的属性与创建新的Axios实例时的config对象的属性相同.

### 修改axios默认配置

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 修改自定义实例默认配置

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 配置的优先级

配置将会按优先级进行合并。它的顺序是：在[lib/defaults.js](https://github.com/axios/axios/blob/master/lib/defaults.js#L28)中找到的库默认值，然后是实例的 `defaults` 属性，最后是请求的 `config` 参数。后面的优先级要高于前面的。下面有一个例子。

```js
// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create();

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```



## 拦截器

在请求或响应被 then 或 catch 处理前拦截它们,然后处理一些业务.

拦截器的参数为一个函数,参数函数有一个参数:

请求拦截器中参数为请求配置config

响应拦截器中参数为响应结构response

拦截器的回调函数本质上是axios请求返回的Promise的"resolve callback", 其返回的Promise的resolve函数的参数与回调函数的返回值相关

>**当Axios实例设置了返回拦截器,则请求的返回值就是返回拦截器的回调函数返回的Promise**,所以可使用await来获取数据.

```js
// 添加请求拦截器
//config: 配置对象,里面有一个属性很重要: headers请求头
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //也可以直接返回`response.data`(响应体)等
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果稍后需要移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以给自定义的 axios 实例添加拦截器。

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
instance.interceptors.response.use(function () {/*...*/});
```

## 错误处理

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

使用请求配置中的 `validateStatus` 配置选项，可以自定义抛出错误的 HTTP code。

```js
// `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject状态的 promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 处理状态码小于500的情况
  }
})
```

使用 `toJSON` 可以获取更多关于HTTP错误的信息。

```js
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```

## 取消请求

### AbortController

从 `v0.22.0` 开始，Axios 支持以 fetch API 方式—— [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 取消请求：

```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

### CancelToken `deprecated`

您还可以使用 *cancel token* 取消一个请求。

> Axios 的 cancel token API 是基于被撤销 [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises)。

> 此 API 从 `v0.22.0` 开始已被弃用，不应在新项目中使用。

可以使用 `CancelToken.source` 工厂方法创建一个 cancel token ，如下所示：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

也可以通过传递一个 executor 函数到 `CancelToken` 的构造函数来创建一个 cancel token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

> 注意: 可以使用同一个 cancel token 或 signal 取消多个请求。

在过渡期间，您可以使用这两种取消 API，即使是针对同一个请求：

```js
const controller = new AbortController();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token,
  signal: controller.signal
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求 (message 参数是可选的)
source.cancel('Operation canceled by the user.');
// 或
controller.abort(); // 不支持 message 参数
```

## 请求体编码



默认情况下，axios将 JavaScript 对象序列化为 `JSON` 。 要以`application/x-www-form-urlencoded`格式发送数据，您可以使用以下选项之一。

### 浏览器

在浏览器中，可以使用[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API，如下所示：

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

> 请注意，不是所有的浏览器(参见 [caniuse.com](http://www.caniuse.com/#feat=urlsearchparams))都支持 `URLSearchParams` ，但是可以使用[polyfill](https://github.com/WebReflection/url-search-params) (确保 polyfill 全局环境)

或者, 您可以使用[`qs`](https://github.com/ljharb/qs) 库编码数据:

```js
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者用另一种方式 (ES6),

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### Node.js

#### Query string

在 node.js 中， 可以使用 [`querystring`](https://nodejs.org/api/querystring.html) 模块，如下所示:

```js
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

或者从['url module'](https://nodejs.org/api/url.html)中使用['URLSearchParams'](https://nodejs.org/api/url.html#url_class_urlsearchparams)，如下所示:

```js
const url = require('url');
const params = new url.URLSearchParams({ foo: 'bar' });
axios.post('http://something.com/', params.toString());
```

您也可以使用 [`qs`](https://github.com/ljharb/qs) 库。

>注意
>
>如果需要对嵌套对象进行字符串化处理，则最好使用 `qs` 库，因为 querystring 方法在该用例中存在已知问题(https://github.com/nodejs/node-v0.x-archive/issues/1665)。

#### Form data

在 node.js, 您可以使用 [`form-data`](https://github.com/form-data/form-data) 库，如下所示:

```js
const FormData = require('form-data');

const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })
```

或者, 使用一个拦截器:

```js
axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});
```

## 注意事项

### 语义化

在axios达到 `1.0` 版本之前，破坏性更改将以新的次要版本发布。 例如 `0.5.1` 和 `0.5.4` 将具有相同的 API，但 `0.6.0` 将具有重大变化。

### Promises

axios 依赖原生的ES6 Promise实现而[被支持](http://caniuse.com/promises)。 如果你的环境不支持 ES6 Promise，你可以使用[polyfill](https://github.com/jakearchibald/es6-promise)。

### TypeScript

axios 包含 [TypeScript](http://typescriptlang.org/) 类型定义。

```typescript
import axios from 'axios';
axios.get('/user?ID=12345');
```

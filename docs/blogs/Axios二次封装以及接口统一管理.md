axios二次封装即新建一个Axios实例

**作用**

二次封装可以修改新建的Axios实例发送请求时的配置项的默认值,比如baseURL和超时时间等

```js
const requests = axios.create({
  baseURL: "api/",
  timeout: 5000,
});
```

还可以为新建的Axios实例设置请求和响应拦截器, 如果直接给axios设置请求和响应拦截器的话, 会污染利用`axios()`发起的请求, 所有要设置请求和响应拦截器的话最好新建Axios实例

> 请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)
>
> 响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

**方法**

在根目录下创建utils/request.ts

```ts
import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
    //请求基地址使用的是环境变量
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    //返回配置对象
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
   	//返回响应体中的data对象
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;
```

### 3.8API接口统一管理

在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；

比如:下面方式

```
//统一管理项目用户相关的接口

import request from '@/utils/request'

import type {

 loginFormData,

 loginResponseData,

 userInfoReponseData,

} from './type'

//项目用户相关的请求地址

enum API {

 LOGIN_URL = '/admin/acl/index/login',

 USERINFO_URL = '/admin/acl/index/info',

 LOGOUT_URL = '/admin/acl/index/logout',

}
//登录接口
export const reqLogin = (data: loginFormData) =>
 request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () =>

 request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
```
# 如何使用nginx解决跨域问题
利用nginx解决跨域问题:

在nginx的配置文件中:

```json
server {
        listen       80; //指定此服务监听的端口和IP地址。例如，listen 80;表示服务器监听80端口上的HTTP请求。
        server_name  localhost; //指定此服务要处理的域名或IP地址。例如，server_name example.com;表示服务器将处理来自example.com域名的请求。
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

    	//location用于配置请求处理规则：通过location块，可以定义不同URL路径的请求处理规则。
    	//例如，location / { ... }表示对根路径(域名+端口)的请求进行特定的处理。
        location / {
    		//root指定项目根目录,index指定项目根目录下的默认返回文件
            root   C:\Users\86173\Desktop\临时文件\计算机网络\Credit-early-warning-system\manage-client\dist;
            index  index.html index.htm;
        }
		//处理以"/api"路径开头的请求
        location /api {
            //proxy_pass用于将请求转发到指定的后端服务器
            //端口后不加"/",将会被代理到http://localhost:8086/,后面没有/api,
            //端口后加"/",将会被代理到http://localhost:8086/api,后面有/api,
       		proxy_pass http://localhost:8086/;
  	    }
```

#
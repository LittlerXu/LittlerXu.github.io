token是常用的登录校验和用户识别的常用方法.

>登录校验指的是有些请求是需要登录之后才能响应的,在服务器接受到这种请求后会先校验用户是否已经登录, 已登录则响应此请求, 未登录则提示用户进行登录.
>
>用户识别指的是有些请求对于不同的用户,相应内容是不同的,这就需要在所有请求中携带上用户的信息以供后端识别用户,但用户信息还需要加密,不然有被非法获取的风险.
>
>这些都可以用token来实现.

Token是一种用于身份验证和授权的令牌。通常是一个字符串，用于表示用户的身份或访问权限。

实现流程:

1. 前端登录后, 如果登录成功(用户名和密码正确), 则后端会依据此用户的信息创建一个JSON Web Token (JWT)令牌,并将此token返回给前端

   >JWT的组成： （JWT令牌由三个部分组成，三个部分之间使用英文的点来分割）
   >
   >- 第一部分：Header， 记录令牌类型、签名算法等。 例如：`{"alg":"HS256","type":"JWT"}`
   >
   >- 第二部分：Payload，携带一些自定义信息、默认信息等。 例如：`{"id":"1","username":"Tom"}`
   >
   >- 第三部分：Signature，防止Token被篡改、确保安全性。依据header、payload和指定秘钥，通过指定签名算法计算而来。
   >
   > >签名的目的就是为了防jwt令牌被篡改，而正是因为jwt令牌最后一个部分数字签名的存在，所以整个jwt 令牌是非常安全可靠的。一旦jwt令牌当中任何一个部分、任何一个字符被篡改了，整个令牌在校验的时候都会失败，所以它是非常安全可靠的。
   >
   >![image-20230106085442076](项目相关.assets/image-20230106085442076.png)
   >
   >生成JWT的方法:
   >
   >1.引入JWT的依赖：
   >
   ```xml
   <!-- JWT依赖-->
   <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt</artifactId>
      <version>0.9.1</version>
   </dependency>
   ```

   >2.定义JwtUtils工具类
   >
   >```java
   >public class JwtUtils {
   >
   >   private static String signKey = "itheima";//签名密钥
   >   private static Long expire = 43200000L; //有效时间
   >
   >   /**
   >    * 生成JWT令牌
   >    * @param claims JWT第二部分负载 payload 中存储的内容
   >    * @return
   >    */
   >   public static String generateJwt(Map<String, Object> claims){
   >       String jwt = Jwts.builder()
   >               .addClaims(claims)//自定义信息（有效载荷）
   >               .signWith(SignatureAlgorithm.HS256, signKey)//签名算法（头部）
   >               .setExpiration(new Date(System.currentTimeMillis() + expire))//过期时间
   >               .compact();
   >       return jwt;
   >   }
   >
   >   /**
   >    * 解析JWT令牌
   >    * @param jwt JWT令牌
   >    * @return JWT第二部分负载 payload 中存储的内容
   >    */
   >   public static Claims parseJWT(String jwt){
   >       Claims claims = Jwts.parser()
   >               .setSigningKey(signKey)//指定签名密钥
   >               .parseClaimsJws(jwt)//指定令牌Token
   >               .getBody();
   >       return claims;
   >   }
   >}
   >```
   >
   >使用JwtUtils工具类中的方法生成和解析JWT
   >
   >```java
   >@RestController
   >@Slf4j
   >public class LoginController {
   >   //依赖业务层对象
   >   @Autowired
   >   private EmpService empService;
   >
   >   @PostMapping("/login")
   >   public Result login(@RequestBody Emp emp) {
   >       //调用业务层：登录功能
   >       Emp loginEmp = empService.login(emp);
   >
   >       //判断：登录用户是否存在
   >       if(loginEmp !=null ){
   >           //自定义信息
   >           Map<String , Object> claims = new HashMap<>();
   >           claims.put("id", loginEmp.getId());
   >           claims.put("username",loginEmp.getUsername());
   >           claims.put("name",loginEmp.getName());
   >
   >           //使用JWT工具类，生成身份令牌
   >           String token = JwtUtils.generateJwt(claims);
   >           return Result.success(token);
   >       }
   >       return Result.error("用户名或密码错误");
   >   }
   >}
   >```

2. 前端在接受到后端返回的token后,将其存入localStorage中,

   ```js
             login(this.loginForm).then((result) => {
               console.log(result)
               if (result.data.code == 1) {
                 setToken(result.data.data); //核心代码
                 console.log('login success');
                 this.$router.push('/');
               } else {
                 this.$message.error(result.data.msg);
                 this.loading = false
               }
             });
   ```

   使用请求拦截器将token加入所有请求的请求头中:

   ```js
   // axios请求拦截器
   service.interceptors.request.use(
     config => {
       let token = getToken();
       if(token){
         config.headers['token'] = token; //核心代码
       }
       return config;
     },
     error => {
       console.log(error)
       return Promise.reject(error)
     }
   )
   ```

3. 登录后每次请求都会带有这个token,后端接收到请求后会根据需要来解析token以获取用户信息

   ```java
   @Test
   public void parseJwt(){
       Claims claims = Jwts.parser()
           .setSigningKey("itheima")//签名密钥（必须保证和生成令牌时使用相同的签名密钥）
   	.parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjcyNzI5NzMwfQ.fHi0Ub8npbyt71UqLXDdLyipptLgxBUg_mSuGJtXtBk")
           .getBody();

       System.out.println(claims);
   }
   ```

   运行测试方法：

   ~~~
   {id=1, exp=1672729730}
   ~~~

   解析前端返回的token成功,则可以获取到用户的相关信息,从而依据此用户信息进行接下来的操作.

4. token过期

   token是有有效期的,有效期过后, 解析此token会失败,并将失败信息发送给前端, 前端在接受到此通知后会清除localStorage中的失效token,然后通知用户身份过期,重新登录.
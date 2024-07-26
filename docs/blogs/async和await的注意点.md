# async和await的注意点
async函数返回一个Promise, await表达式接受一个Promise,但这两种情况下的Promise的onFulfilled函数的执行时机是不一样的:

async函数返回的Promise的onFulfilled函数执行时机与async函数的中return表达式所接受的值有关:

- return结果值：非`thenable`、非`promise`（不等待）
- return结果值：`thenable`（等待 1个`then`的时间）
- return结果值：`promise`（等待 2个`then`的时间）

```js
// (不等待)最终结果👉: 1 2 3
async function testA () {
    return 1;
}

testA().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));

// (等待一个then)最终结果👉: 2 1 3
async function testB () {
    return {
        then (cb) {
            cb();
        }
    };
}

testB().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));

// (等待两个then)最终结果👉: 2 3 1
async function testC () {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

testC().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));

// (等待两个then)最终结果👉: 2 3 1 4
async function testC () {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

testC().then(() => console.log(1));
Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4))

```

综合案例:

```js
async function async1 () {
    console.log('1')
    await async2()
    console.log('AAA')
}

async function async2 () {
    console.log('3')
    return new Promise((resolve, reject) => {
        resolve()
        console.log('4')
    })
}

console.log('5')

setTimeout(() => {
    console.log('6')
}, 0);

async1()

new Promise((resolve) => {
    console.log('7')
    resolve()
}).then(() => {
    console.log('8')
}).then(() => {
    console.log('9')
}).then(() => {
    console.log('10')
})
console.log('11')

// 最终结果👉: 5 1 3 4 7 11 8 9 AAA 10 6
```

>步骤拆分👇：
>
>1. 先执行同步代码，输出`5`
>
>2. 执行`setTimeout`，是放入宏任务异步队列中
>
>3. 接着执行`async1`函数，输出`1`
>
>4. 执行`async2`函数，输出`3`
>
>5. `Promise`构造器中代码属于同步代码，输出`4`
>
>  > `async2`函数的返回值是`Promise`，等待`2`个`then`后放行，所以`AAA`暂时无法输出
>
>6. `async1`函数**暂时**结束，继续往下走，输出`7`
>
>7. 同步代码，输出`11`
>
>8. 执行第一个`then`，输出`8`
>
>9. 执行第二个`then`，输出`9`
>
>10. 终于**等**到了两个`then`执行完毕，执行`async1`函数里面剩下的，输出`AAA`
>
>11. 再执行最后一个微任务`then`，输出`10`
>
>12. 执行最后的宏任务`setTimeout`，输出`6`



await后的Promise的onFulfilled函数执行时机与await表达式所接受的值有关:

- `await`后面接`非thenable` 和`Promise`时，不需等待
- `await` 后面接 `thenable` ，**等待一个 `then` 的时间之后**执行

```js
//非thenable:无需等待
async function test () {
    console.log(1);
    await 123
    console.log(2);
}

test();
console.log(3);

Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));

// 最终结果👉: 1 3 2 4 5 6 7

//thenable:等待一个then的时间之后执行
async function test () {
    console.log(1);
    await {
        then (cb) {
            cb();
        },
    };
    console.log(2);
}

test();
console.log(3);

Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));

// 最终结果👉: 1 3 4 2 5 6 7


//Promise:无需等待
async function test () {
    console.log(1);
    await new Promise((resolve, reject) => {
        resolve()
    })
    console.log(2);
}

test();
console.log(3);

Promise.resolve()
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7));

// 最终结果👉: 1 3 2 4 5 6 7
```

综合案例:

```js
async function func () {
    console.log(1);
    await 1;
    console.log(2);
    await 2;
    console.log(3);
    await 3;
    console.log(4);
}

async function test () {
    console.log(5);
    await func();
    console.log(6);
}

test();
console.log(7);

Promise.resolve()
    .then(() => console.log(8))
    .then(() => console.log(9))
    .then(() => console.log(10))
    .then(() => console.log(11));

// 最终结果👉: 5 1 7 2 8 3 9 4 10 6 11
```


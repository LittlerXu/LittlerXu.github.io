# 路由过渡效果导致的闪烁bug解决

为路由组件的切换添加过渡效果:

```vue
<template>
<router-view v-slot="{ Component }">
                        <transition>
                            <component :is="Component" />
                        </transition>
                    </router-view>
</template>

<style>
    //组件过渡效果
.v-enter-active,
.v-leave-active {
    transition: all 1s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

//防止组件切换时的闪烁
.v-leave-to {
    display: none;
}
</style>
```

由于路由组件在切换时,旧路由组件在过渡效果完成后并不会立即消失,从而导致新路由新路由组件出现在旧路由组件的下方,待旧路由组件消失后回到旧路由组件的位置,这就是路由组件切换时闪烁的原因.

解决方法就是使旧路由组件在过渡效果完成后立即消失,做法如上.
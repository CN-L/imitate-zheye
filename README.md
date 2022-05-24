# Vue 3 + TypeScript + Vite

## render Fuction 和 vnode

- ### 认知vitrulalDom

定义： 一种虚拟的，<u>保存在内存中的结构数据，用来代表ui的表现</u>，和真实dom字节保持同步。VitrulalDom（虚拟dom）是由一系列的Vnode组成的

```typescript
// 模拟一个简单的Vnode
cont vNode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```

- ### Render Pipeline（即template编译）

```vue
1. Compile, vue组件的Template会被编译为render function(特殊的function，即一个返回Virtual Dom树的函数)

2. Mount， 执行render function， 遍历虚拟dom树。生成真正的dom节点

3. Path， 当组件中响应式对象（依赖）发生变化。执行更新操作。生成新的虚拟Dom节点数，vue内部会遍历新的虚拟节点树，和旧的做对比，执行必要的更新
```



### 对比template和render function的写法区别：

```vue
1. template比render function更接近html，更好懂，更容易修改
2. template更容易做静态优化，Vue的complier在编译过程中可做很多自动的性能优化
3. 实践中，template适应大多数的情况，只有在极少数情况下，还需要学习使用render function。因为它本身是javascript语法，要灵活多变。vue提供对应的api乐意不使用template，而是直接使用render funcition
```



### 虚拟Dom的优点

```html
使用更方便的方式，供开发者操作ui的状态和结构，不必跟真实dom节点打交道

更新效率高，计算需要的最小化操作，并完成更新
```



### 关于监听子组件的生命周期

vue3.0中

```vue
 <!-- 在 Vue 3 中，事件名附带的是 vnode- 前缀： -->
<template>
  <child-component @vnode-updated="onUpdated">
</template>
<!-- 或者在驼峰命名法的情况下附带前缀 vnode： -->
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

vue2.0中

```vue
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

创建虚拟dom: h函数

```typescript
h('h1', props.msg + count.value), h('div', count.value)
<!--也可以返回个数组-->
return () => [h('h1', props.msg + count.value), h('div', count.value)]
```

jsx是h函数的语法糖，可以将这种类似于html写法转为h函数

```jsx
// 创建vnode
const vnode = <div>hello</div>
//使用变量
const vnode = <div id={dynamicId}>hello, {username}</div>
```

关于render函数：常见于虚拟dom渲染

```tsx
<!-- 如果想使用mout进行挂载 那是createdApp创建出来的虚拟dom才能行-->
render(messageVnode, mountNode) <!--messageVnode 挂在到moutNode-->
```

关于退出登陆的功能

```html
目中使用isLogin记录当前状态，一旦刷新为false，但app.vue中调用了当前用户信息的请求 处理请求时重新设为了true， 退出登陆应该是清本地存储,提交mutations手动改isLogin状态和token
```


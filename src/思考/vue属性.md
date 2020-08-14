## 一些属性




### Vue.options

Vue.options 是Vue提供的一个全局的对象，Vue在源码内会将其余组件混合，所以一些内置的组件，
指令我们就可以在组件中自由的使用，而无需引入。


一个常规的Vue.options 如下：


```
{
  components:[
    keep-alive,
    transition,
    ...
  ],
  directive:[
    model,
    show,
    if,
    ....
  ]
  ....
}

```
当然这些是Vue内置的，我们也可以借助，Vue会将Vue.options混入所有的组件中的特性，实现一些特殊的功能。

比如：


```

Vue.options.data={
  source:'这是来自根上的data'
}

<!-- 这里created 必须提供的是一个数组，否则源码里没法对其处理 -->
Vue.options.created=[function(){
  console.log('这是在全局定义的create方法')
}]

```

我们为Vue.options赋两个值，分别是data 和 created。

那么，我们应用中所有的组件都能通过 this.source  访问到我们定义的变量

另外，每一个组件也都会执行一些 created的方法。当然，如果自己的组件也定义了一个created生命周期函数，
那么，无所谓，两个created都会执行。
































### propsData

propsData是在全局扩展时进行传递数据。

全局扩展也就是 Vue.extend()

比如：


```
var PPR =  Vue.extend({
　　template:`<div>{{message}}   传值 {{ a }}</div>`,
　　data:function(){
　　　　return {
　　　　　　message:"内容"
　　　　}
　　},　　
　　props:['a']
})

使用
new PPR().$mount('#app') // 这里表示要将当前组件挂载的位置，不传值的话就会appenChild到body后。

```

如果在使用 PPR的时候要传值的话就需要用到了propsData

如下：

```
new PPR({propsData:{a:1}}).$mount('#app')

```

如此就实现了传值。

### el

el 属性表示要挂载的位置。


这里 propsData和el的使用 指南使用在 被new 调用 地方，如下所示：

```
var PPR =  Vue.extend({
  　　template:`<div>{{message}}   传值 {{ a }}</div>`,
  　　data:function(){
  　　　　return {
  　　　　　　message:"内容"
  　　　　}
  　　},　　
  　　props:['a'],
  })

new PPR({propsData:{a:'121212'},el:'#app2'}).$mount()

```
或者是

```
new Vue({
    el:'#app1',
    components:{}
})

```

如果你在普通组件中使用了el属性，开发环境下则会抛出错误，

比如：


```
// 子组件
var ChildComponent = {
  el: '#app2',
  created: function () {
    console.log('child component created')
  }
}
 
// 父组件
new Vue({
  el: '#app',
  data: {
    test: 1
  },
  components: {
    ChildComponent
  }


```

父组件中使用了 el没有问题，子组件中使用了的话就会报错。
## 关于 childVal 和 parentVal

```


声明一点，childVal 代表的是当前组件的 options。

比如，new Vue的时候 childVal 表示的就是 new Vue的参数。

parentVal 表示的就是 Vue.prototype.options

再比如：

```

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
})

```
子组件 ChildComponent 在实例化的时候， childVal表示自己，parentVal表示 new Vue。



### 关于参数 vm


vm参数主要是用来判断当前处理的组件是不是根组件，也就是，是不是 new Vued 调用的

只有在 new Vue的时候，才会有 vm参数。其他情况下不会有vm参数
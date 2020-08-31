## _init 

_init方法的核心代码就是如下所示的三部分


### 合并 options

```
vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
)

```


这里的参数，如果存在 vm 参数，就可以认为当前组件是 通过 new Vue来使用的，

这个方法总除了再 new Vue的时候调用过一次，这个时候传递了参数 vm，另外一次是 在 Vue.extend方法中被调用，且没有传递参数 vm。

所以：

通过判断是否存在 vm 就能够得知 mergeOptions 是在实例化时调用(使用 new 操作符走 _init 方法)还是在继承时调用(Vue.extend)，而子组件的实现方式就是通过实例化子类完成的，子类又是通过 Vue.extend 创造出来的，所以我们就能通过对 vm 的判断而得知是否是子组件了。

### 初始化必须的方法


```
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

```


### 挂载

```
if (vm.$options.el) {
    vm.$mount(vm.$options.el)
}

```
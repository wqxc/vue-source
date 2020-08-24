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
## new Vue

在 new Vue的时候实际是执行了 Vue._init()方法。

_init方法主要做的事情如下：

```
    Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
    )
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }

```

1、合并 options
2、initLifecycle(vm) 初始化 生命周期
3、initEvents(vm) 初始化事件
4、initRender(vm) 初始化渲染
5、
5、callHook(vm, 'beforeCreate')  // 调用生命周期钩子函数
6、initInjections(vm)   //初始化injections
7、initState(vm)    // 初始化props,methods,data,computed,watch
8、initProvide(vm) // 初始化 provide
9、callHook(vm, 'created')  // 调用生命周期钩子函数
10、看看有没有要挂载的点，有的话就挂载
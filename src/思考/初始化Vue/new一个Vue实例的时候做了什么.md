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
5、callHook(vm, 'beforeCreate')  // 调用生命周期钩子函数
6、initInjections(vm)   //初始化injections
7、initState(vm)    // 初始化props,methods,data,computed,watch
8、initProvide(vm) // 初始化 provide
9、callHook(vm, 'created')  // 调用生命周期钩子函数
10、看看有没有要挂载的点，有的话就挂载


### 合并属性

```
vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
)

```

参数1、

```
resolveConstructorOptions(vm.constructor) == Vue.options

<!--  -->

Vue.options

Vue.options = {
	components: {
		KeepAlive
		Transition,
    	TransitionGroup
	},
	directives:{
	    model,
        show
	},
	filters: Object.create(null),
	_base: Vue
}
```

Vue.options 就是全局的一些内容，比如过渡组件 Transition，比如指令 v-model等。你没有看到任何地方使用 Vue.component 或者是 Vue.directive 全局注册过，但是，你可以在任何你想要使用的地方使用。

原因就在于 new Vue实例的时候，将Vue.options 与 new Vue自身的options进行了合并。相当于在源码中进行了混入。

参数2、

options 就是 new Vue的时候传的那些参数

参数3、

就是当前的实例

### mergeOptions

```
function mergeOptions (parent,child,vm) {
  <!-- child 就是 new vue的时候的对象参数 -->
  <!-- checkComponents方法的作用就是验证一下new vue的时候传递的对象的components属性内的组件是不是合乎规则
    比如一下保留的组件名称不能被使用 像是 keep-alive等
   -->
  <!-- 简单的来说就是 根据正则表达式匹配一下 -->
  checkComponents(child)

  <!-- 而后是规范函数 分别对 props inject directive进行规范，
    这里规范的原因是vue提供了多种书写方式，但是，在处理的时候必须对其进行归一化。
  -->
    
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
}

```
### el, propsData的合并策略



```
strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
}

```

el： 是声明组件挂载的元素，该属性必须是出现在 根组件中。也就是new Vue({})的参数中。

propsData： 用于全局混入一些属性，一般只能在new Vue 中使用

以上两者的合并策略是： defaultStrat


### defaultStrat

defaultStrat 是一个兜底的策略。

```

const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}

```

defaultStrat 方法的作用是 如果 childVal 存在就返回 childVal，如果childVal不存在就返回 parentVal。
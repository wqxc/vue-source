## data 的合并策略

data在合并的过程中最终会return 一个函数。

这个函数的执行结果是组件的data


```
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}

```

如果 childVal 不是一个 函数，并且 当前组件不是 根组件（也就是没有 vm参数的时候），直接返回了 parentVal。

然后是根据存在 vm 参数与否来调用 mergeDataOrFn 方法。

### mergeDataOrFn

1、当前组件是子组件的时候

```
if (!childVal) {
    return parentVal
}
if (!parentVal) {
    return childVal
}

return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
}

```
最终 return了一个方法 mergedDataFn，注意，这里只是return了一个方法，这个方法在这个时候并没有执行。

其中  mergedDataFn 方法的执行结果是 返回   mergeData 函数的执行结果

mergeData 就是将两个对象合并在一起。


2、当前组件不是子组件的时候

```
return function mergedInstanceDataFn () {
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
}

```

这种情形下，return的 依旧是一个函数。

###  策略模式

```
function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
}

```

参数key 就比如，data,watch,生命周期钩子函数，components等属性。这些属性是构造实例的一些常规的属性。


根据key选择策略， defaultStrat 作为兜底策略

```

const strat = strats[key] || defaultStrat

```
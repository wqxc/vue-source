## mergeOptions

作用是合并两个options为一个

### 参数

```

parent: Object,  必须 父组件的options 
child: Object,   必须 当前组件的options
vm?: Component   非必须 当前组件，

```


## 核心代码分为如下几部分


### 规范化 normalize

```
normalizeProps(child, vm)
normalizeInject(child, vm)
normalizeDirectives(child)

```


参阅 \src\instance\_init\normalize 文件夹下的内容

简单的来说，就是将多种代码书写方式，规范化为一种，便于后期处理。



### 遍历

```

const options = {}

let key
for (key in parent) {
    mergeField(key)
}
for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
}

```

遍历 两个参数，并调用 mergeField方法将两个 option合并为一个.




### mergeField


```
function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
}

```

这里采用了策略模式，根据要合并的属性不同，选择不同的策略。
比如， data  watch components method 等，都会选择对应的方式来处理，这就叫做策略模式
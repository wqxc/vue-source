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
## Props

一般我们使用props来接收，父组件传递过来的值。其书写方式有三种。


1、数组的方式

```
const ChildComponent = {
  props: ['someData']

```

2、对象方式

```
props: {
  someData:{
    type: number,
    default:0
  }
}

```

3、另外的一种对象方式

```
props: {
  someData:number
}


```


因为在开发中有以上三种书写方式，但是vue内部处理的时候，会先将其规范为一种，如下：


```
props: {
  someData:{
    type: number,
    default:0
  }
}

```

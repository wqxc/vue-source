## inject

inject 是vue2.2提出的新功能。

主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

主要的作用：

以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。


provide：Object | () => Object

inject：Array<string> | { [key: string]: string | Symbol | Object }

祖先组件使用 provide 选择注入数据。

子组件使用 inject 接收。



我们先注入一个数据

```
var Provider = {
  provide: {
    foo: 'bar'
  },
}

```

接收方式有以下几种

1、数组


```
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
}

```


2、对象方式

```

var Child = {
  inject: {
    d: 'data'
  },
  created () {
    console.log(this.foo) // => "bar"
  }
}

```


3、另外一种对象方式

```
var Child = {
  inject:{
      foo: {
          from:'foo',// 如祖先组件提供了多个注入的内容，这里指明要取哪一个
          default:'123'
      }
  },
  created () {
    console.log(this.foo) // => "bar"
  }
}

```

同样的是提供了多种写法，但是，vue将其规范为对象模式

```
inject:{
    {
    'foo': { from: 'foo' }
    }
}

```
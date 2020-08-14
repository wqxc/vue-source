## directive

比如我们注册两个指令

```
 directives: {
    test1: {
      bind: function () {
        console.log('v-test1')
      }
    },
    test2: function () {
      console.log('v-test2')
    }
  }

```

test1 指令使用了对象方式，并提供了一个bind方法。
test2 指令使用了函数方法，只是提供了一个函数。

这两种方法，vue都支持，只是，在vu源码内会对其进行规范化的处理。

规范的代码很简单，如下：

```
const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }

```

如果给的指令是一个函数，就将其转换为对象的形式，比如test2指令被转换为。


```
test2: {
    bind: function () {
      console.log('v-test2')
    },
    update: function () {
      console.log('v-test2')
    },
}

```

也就是将函数本身赋值给 bind和update。
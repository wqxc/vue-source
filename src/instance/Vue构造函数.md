## Vue 构造函数

Vue构造函数很简单，就如下所示。

```
function Vue (options) {
    if(this instanceof Vue){warn('Vue is a constructor and should be called with the `new` keyword') }
    this._init(options)
}

```


## new Vue 做了什么

首先是限制Vue构造函数的使用方法是，必须使用 new调用。

而后在 new Vue 的时候主要就是调用了 _init 方法，并将 options 作为参数。

而，_init 方法是原型方法。它是通过 initMixin 方法添加在原型上的。
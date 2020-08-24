## Vue.extend

```
Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    // this 指的是Vue 构造函数
    /*
    vue如下所示
    function Vue (options) {
      this._init(options)
    }
    */ 
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

```

Vue.extend 主要做的事情是继承了Vue，核心代码如下：


```
    ...

    const Super = this

    ...

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub

    ...

    return Sub

```
以上是Vue.extend的核心代码，主要做的是继承。但是，这里写继承的方式并不完整，可以说是半继承
之所以说是半继承，是因为上边的代码只继承了Super原型对象上的属性，Super本身的内容没有继承。

## 完整的继承

```
    ...

    const Super = this

    ...

    const Sub = function VueComponent (options) {
      this._init(options)
      Super.call(this) -------------------- call了一下Super
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub

    ...

    return Sub

```


Vue.extend的源码中之所以没有

```

Super.call(this)

```

是因为，不需要。

我们看一下Super，也就是Vue构造函数是啥

```
function Vue (options) {
    this._init(options)
}

```

很简单，没有需要constructor的属性。所以Vue.extend中就不需要调用call方法了。

## mergeData

```

function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}


```

mergeData 函数很简单，就是将 一个对象合并到另外一个对象上，也就是深拷贝。

@param  from  表示 parentVal

@param to 表示 childVal

遍历有几种情况。

1、 key值在from上存在，在to上也存在。
比如：

```
from:{
    name:'a'
}

to:{
    name:'b'
}

```

那么，以to上的为准





```

if (!hasOwn(to, key)) {
    set(to, key, fromVal)
} 

```
如果，key不在 to上，就调用 set方法将其放置在 to上。 set方法参考 ./set.md


```

else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
}

```

如果，当前的key已经在to 上存在了，就判断以下几项是不是成立。
    toVal !== fromVal &&
    isPlainObject(toVal) &&
    isPlainObject(fromVal)

也就是表示当前key 在 to 和 from上都有，而且都是对象，而且不相等。这里递归调用深度遍历了。

比如

```
from:{
    name: {
        p1:'12',
        p2:'12'
    }
}

to:{
    name: {
        p1:'129',
    }
}

```

from.name != to.name 而且两个都是对象。
递归调用。最终to变为

```
to:{
    name: {
        p1:'129',
        p2:'12'
    }
}

```
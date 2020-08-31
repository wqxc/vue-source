## _toString

```
const _toString = Object.prototype.toString
```

## isPlainObject

判断对象给定的参数是不是纯JavaScript对象。

也就是一个对象是不是通过 {} 或者是 new Object() 生成的。

比如 new Date() 或者是 new String() 则不是纯粹js对象

```

export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

```

## isRegExp

判断是不是正则

```
export function isRegExp (v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

```

## isValidArrayIndex

数组的下标是否有效

```
export function isValidArrayIndex (val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

```

判断给定的下标 为正数 也就是>=0
且在 规定范围内 isFinite 为true
并且不是小数 Math.floor(n) === n


## isPromise
判断是不是promise

```
export function isPromise (val: any): boolean {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

```

是定义了的
有then方法
有catch方法

满足以上三个条件就是promise


## toString

作用是将值转换为实际呈现的字符串。

```
export function toString (val: any): string {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

```

JSON.stringify(val, null, 2)

序列化一个对象，第二个参数是过滤参数，对要序列化的对象的过滤，null 表示不过滤。 最后的数字参数，表示序列化之后的对象的格式

2 表示空两格。


### isPrimitive

检查值是否是原始值

```
export function isPrimitive (value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```

### isValidArrayIndex

判断index是否是有效的 index必须是正整数，且必须在有效的范围内

```

export function isValidArrayIndex (val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

```
## Object.create

创建一个对象，并将创建的新对象的__proto__ 属性指向，给的参数对象。


### 类式继承

Parent

```

function Parent(name) {
    this.name = name
}

Parent.say=function(){
    console.log('叫爸爸)
}

```

Child

```

function Child(){
    Parent.call(this)
}

```

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

如此，Child 类就继承了Parent 类。

### 多继承


```
function SuperClass(name) {
     this.name =name
}

function OtherSuperClass(name) {
     this.age = age
}


function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

```

如此可以实现，一个类继承多个类
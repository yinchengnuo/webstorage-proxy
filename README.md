# 已停止维护

# 欢迎使用 webstorage-proxy.js

webstorage-proxy.js 是一个小巧实用JavaScript工具库。你可以使用它用操作对象的方式操作sessionStorage/localStorage。你可以使用它在客户端存储数据，并且支持自定义方法对这些数据进行加密。主要用于监听 sessionStorage/localStorage 变化、SPA的组件/路由之间和同域名不同页面之间的通信。  

----

## 简介

WebStorageProxy 做的就是把 sessionStorage/localStorage 的内容映射到一个对象上，最后返回这个对象的代理器。然后当你想要操作 sessionStorage/localStorage时， 你只需要用操作对象的方式操作这个代理器，操作的结果就会映射到 sessionStorage/localStorage 上。当然这只是 WebStorageProxy 的基础功能。当前版本的 WebStorageProxy 还支持 **生命周期函数**、**数据监听**、**同页面监听sessionStorage/localStorage**、**命名空间**、**数据加密**等。

----

## 安装

### NPM

> npm i @yinchengnuo/webstorage-proxy

### Git

> git clone git@github.com:yinchengnuo/webstorage-proxy.git

### CDN

> &lt;script src="<https://cdn.jsdelivr.net/npm/@yinchengnuo/webstorage-proxy@1.0.4/dist/webstorage-proxy.min.js>"&gt;&lt;/script&gt;

----

## 使用

引入webstorage-proxy.js，window上就有了一个叫 WebStorageProxy 的类。你可以这样使用它：

```javascript
const storage = new WebStorageProxy('sessionStorage')
console.log(sessionStorage.getItem('name')) //null

storage.name = 'yinchengnuo'
console.log(sessionStorage.getItem('name')) //yinchengnuo

delete storage.name  //true
console.log(sessionStorage.getItem('name')) //null
```

或者：

```javascript
const storage = new WebStorageProxy('sessionStorage')
storage.data= {
	name: 'yinchengnuo',
	age: 23,
	skills: ['web', 'guitar']
}
console.log(sessionStorage.getItem('data'))  //"{"name":"yinchengnuo","age":23,"skills":["web","guitar"]}"
```

或者：

```javascript
// in main.js
import Vue from 'vue'
import WebstorageProxy from '@yinchengnuo/webstorage-proxy'

Vue.prototype.$storage = new WebstorageProxy('sessionStorage')

// in component
this.$storage ...
```

这样使用，在操作数组或对象类型的数据时就会很方便。

### API

|       方法   | 参数           |       描述    |
| ------------ | ------------- | ----------  |
|   ***all***  |  null  | 返回一个新对象，里面包含实例的所有数据|
|   ***has***  |  string  | 返回一个布尔值，表示实例里面是否有指定的 key|
| ***clear***|null| 清空实例和 webStorage里面的 的所有数据 |

### 示例

```javascript
const storage = new WebStorageProxy('sessionStorage')
storage.data= {
	name: 'yinchengnuo',
	age: 23,
	skills: ['web', 'guitar']
}
console.log(storage.all(), storage.has('name'))
//{
//	name: "yinchengnuo",
//	age: 23,
//	skills: ["web","guitar"]
//}
console.log(storage.has('name'))
//false

storage.clear()
console.log(storage.all())
//{}
consle.log(sessionStorage.getItem('data'))
//null
```

### 实例化配置

**WebStorageProxy 最多可以接收两个参数**。

当参数为两个时，第一个必须是一个值为 'sessionStorage' 或 'localStorage'的字符串，第二个参数为字符串或返回字符串的函数作为命名空间。如果参数为函数时，这个函数会接收一个数组，这个数组里包含当前 storage 所有的命名空间：

```javascript
const storage1 = new WebStorageProxy('sessionStorage'，'namespace1')
const storage2 = new WebStorageProxy('sessionStorage'，namespace => {
	console.log(namespace) //['namespace1']
	return 'namespace2'
})
```

当参数为一个时，这个参数可以是是一个值为 'sessionStorage' 或 'localStorage'的字符串，就像上面据的几个例子一样。同时也可以是一个配置对象。完整的配置对象长这个样子：

```javascript
//配置对象中的可配置函数分为两种：
//1. 生命周期函数，每个实例只执行一次
//2. 数据监听函数。可在实例生成后追加多个，非箭头函数时this指向操作的key所在的代理对象。
const storage1 = new WebStorageProxy({
	type: 'sessionStorage',
	namespace: 'yinchengnuo',
	beforeCreate() {
		//生命周期函数。非箭头函数时this指向window。在实例生成之前执行。
	},
	created() {
		//生命周期函数。非箭头函数时this指向实例对象。在实例生成之后执行。
	},
	beforeGet(key) {
		//数据监听函数。接收要获取key作为参数。在get操作执行之前执行
	},
	geted(key) {
		//数据监听函数。接收要获取的key作为参数。在get操作执行之后执行
	},
	beforeSet() {
		//数据监听函数。接收要设置的key和value作为参数。在set操作执行之前执行。
	},
	proxySeted() {
		//数据监听函数。接收要设置的key和value作为参数。在set操作执行之后执行。
	},
	storageSeted() {
		//数据监听函数。接收要设置的key和value作为参数。在代理对象上的数据映射到webStorage上之后执行。
	},
	beforeDel() {
		//数据监听函数。接收要删除的key作为参数。在delete操作执行之前执行。
	},
	proxyDeled() {
		//数据监听函数。接收要删除的key作为参数。在delete操作执行之后执行。
	},
	storageDeled() {
		//数据监听函数。接收要删除的key作为参数。在代理对象上的数据映射到webStorage上之后执行。
	},
	storageChanged() {
		//数据监听函数。在 type 里指定类型的 Storage 实力发生变化时执行。接收一个事件对象作为参数。
	},
	beforeDestroy() {
		//生命周期函数。非箭头函数时this指向实例对象
	},
	destroyed() {
		//生命周期函数。非箭头函数时this指向window
	}
})
```

这些配置对象里的钩子函数看起来很多，其实只有两类：生命周期函数和数据监听函数。

生命周期函数只能在实例化时通过配置对象设置，每个生命周期函数在实例对象的生命周期内只执行一次。有四个，分别是：**beforeCreate**、**created**、**beforeDestroy**、**destroyed**。
数据监听函数不仅仅可以通过实例配置对象设置，也可以在实例化对象生成之后通过赋值的形式追加多个。有9个。分别用于监听4种行为种：get、set、delete和storagechange。9个函数分别是：**beforeGet**、**geted**、**beforeSet**、**proxySeted**、**storageSeted**、**beforeDel**、**proxyDeled**、**storageDeled**，最后一个是**storageChanged**。
关于这些配置函数的用法会在后面的部分一一讲解。

----

## 生命周期函数

通过上面的几个小例子，你大概也能知道。在实例化 WebStorageProxy 时，**beforeCreate**、**created**会被相继触发。

```javascript
const storage = new WebStorageProxy({
	type: 'sessionStorage',
	beforeCreate() {
		console.log('beforeCreate')  //'beforeCreate'
	},
	created() {
		console.log('created')  //'created'
	}
})
```

但是**beforeDestroy**、**destroyed**呢？它们何时触发呢？即，如何销毁一个 WebStorageProxy ？你可以使用 destory(del,bool) 方法：

### destory(del, bool)

```javascript
const storage = new WebStorageProxy({
	type: 'sessionStorage',
	beforeDestroy() {
		console.log('beforeDestroy')  //'beforeCreate'
	},
	destroyed() {
		console.log('destroyed')  //'created'
	}
})
storage.name = 'yinchengnuo'
storage.name  //'yinchengnuo'
storage.destory()
storage.name  //Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

destory(del, bool)方法接收两个参数。都为布尔值。
第一个参数表示是否在销毁 实例化对象时清除 WebStorage 里面的数据。
第二个参数表示 _是否将 Storage.prototype 上的方法，恢复为原生方法_。（在 **同页面监听sessionStorage/localStorage** 部分会有讲解。不建议使用此参数！）。

----

## 数据监听

WebStorageProxy 提供了丰富的数据监听函数，可以让你时刻监听你的数据动向。

***但事实上，我个人并不建议你过多的使用这些函数。这些函数的出现只是为了在开发这个工具库的时候方便监控数据变动。但是考虑到这个工具库还不成熟，可能存在未知的风险。因此索性将这些钩子函数暴露出来，在你使用过程中如果出现未知问题就可以实时调控***。

因为是监听数据变动，那么这些钩子函数就不能像实例的生命周期函数一样：一个实例只执行一次，而且只能在实例化时的配置对象里定义。我希望它能够更灵活一些。毕竟这个工具库开发的初衷之一就是为了方便。于是你除了可以在通过在实例化时的配置对象里定义以外，还可以这样做：

```javascript
const storage = new WebStorageProxy({
	type: 'sessionStorage',
	beforeSet (key, value) {
		console.log('beforeSet', key, value)
	}
})

storage.beforeSet = (key, value) => console.log('beforeSet1', key, value)
storage.beforeSet = (key, value) => console.log('beforeSet2', key, value)
storage.beforeSet = (key, value) => console.log('beforeSet3', key, value)
storage.name = 'yinchengnuo'
//'beforeSet', 'name', 'yinchengnuo'
//'beforeSet1', 'name', 'yinchengnuo'
//'beforeSet1', 'name', 'yinchengnuo'
//'beforeSet1', 'name', 'yinchengnuo'
```

是的，你不仅可以在实例化时的配置对象里定义的同时，在实例对象上追加钩子函数，而且还可以追加多个。原因很简单:

***WebStorageProxy 在实例化对象的过程中会把实例对象的数据监听函数属性包装成一个类数组并添加代理，使得 set 行为变为 push 行为，并在适当的时候遍历这个类数组执行里面的函数**。

所以（我们以 beforeSet 为例），实例化对象产生以后。这个对象上的 beforeSet 属性就是一个类数组了, 类数组里面的函数相互独立，互不影响。给 beforeSet 属性赋值就是在向这个类数组里面添加钩子函数。还是上面的例子：

```javascript
const storage = new WebStorageProxy({
	type: 'sessionStorage',
	beforeSet (key, value) {
		console.log('beforeSet', key, value)
	}
})

storage.beforeSet = (key, value) => console.log('beforeSet1', key, value)

storage.beforeSets[0]
//beforeSet (key, value) {
//	console.log('beforeSet', key, value)
//}
storage.beforeSets[0]  //(key, value) => console.log('beforeSet1', key, value)
```

需要注意的是：***追加的钩子函数名和函数值必须合法。当前版本的 WebStorageProxy 不支持删改数据监听钩子函数类数组里的函数，只允许添加***。

----

## 同页面监听sessionStorage/localStorage

H5在新增了 WebStorage 的同时，也为 WebStorage 提供了事件支持。但是原生的 window 上的 storage 事件只能监听到同域下不同页面操作 localStorage 行为。同一个 session 下操作 sessionStorage 和 localStorage 都是监听不到。因为 WebStorage的读写操作都是同步的，而且不能跨域，都是在一个页面里，确实没什么必要监听。但是，随着前端的发展，各种SPA的出现，应该会有不同路由或组件的状态需要根据 WebStorage 的状态变化的业务场景出现，这也是这个工具库开发的初衷之一，做出来以防万一嘛。

那 WebStorageProxy 是如何监听 WebStorage 变化的呢？其实很简单，就是重写 Storage.protoytpe 上面的方法，让它们在适当的时候触发 window 上的自定义事件。这两个自定义事件分别是 sessionstoragechange 和 localstoragechange 。你可以监听他们，前提是必须实例化一次 WebStorageProxy：

```javascript
new WebStorageProxy('sessionStorage')

window.addEventListener('sessionstoragechange', e => {
	console.log(`
		sessionstoragechange, 
		key: ${e.key},
		newValue: ${e.newValue}, 
		oldValue: ${e.olaValue}
	`)
})
window.addEventListener('localstoragechange', e => {
	console.log(`
		localstoragechange, 
		key: ${e.key},
		newValue: ${e.newValue}, 
		oldValue: ${e.olaValue}
	`)
})
sessionStorage.setItem('name', 'yinchengnuo')  
//'sessionstoragechange, key: name, newValue: yinchengnuo, oldValue: null'

localStorage.setItem('name', 'yinchengnuo')
//'localstoragechange, key: name, newValue: yinchengnuo, oldValue: null'
```

当然，如果你还记得刚刚我们说过的数据监听那块。你应该还记得：数据监听函数中有一个 storageChanged 函数。没错，你也可以这样使用它：

```javascript
const storage = new WebStorageProxy('sessionStorage')

storage.storageChanged = e => console.log('listener1')
storage.storageChanged = e => console.log('listener2')
storage.storageChanged = e => console.log('listener3')

storage.name = 'yinchengnuo'
//'listener1' 'listener2' 'listener3'
```

## 命名空间

为社么要使用命名空间？

1. 命名空间是数据加密的基础
2. 使用命名空间在数据变动时可以减少一次遍历，提升一些性能
3. 便于多人协作开发

便于多人协作开发这个就不赘述了，我学前端时第一次知道这个命名空间概念时，他就是为了解决多人协作开发了。但是为什么命名空间是数据加密的基础呢？（WebStorageProxy 提供了数据加密功能，但是只能加密命名空间之中的数据。详细介绍在下一部分）

假设我们现在没有使用命名空间：

```javascript
sessionStorage.name = 'sessionStorage'
const storage = new WebStorageProxy('sessionStorage')

storage.name  //'sessionStorage'
```

如果在我们实例化 WebStorageProxy 对象之前。WebSorage 中已经存在了一些数据。而实例化 WebStorageProxy 之后，这些数据是会被全部映射到 WebStorageProxy 实例对象上的。如果我们采用了加密策略，那么 WebStorageProxy 实例对象修改这些已经存在的数据势必会启用加密算法。如果此时还有一些别的程序正在依赖这些数据，而它们并没有实例化 WebStorageProxy 对象。那他们在读取这些数据时势必会报错。因为它们没有对称解密函数。

你可以把不使用命名空间时 WebStorageProxy 实例对象的状态想象为全局。使用命名空间时 WebStorageProxy 实例对象的状态想象为局部。当全局里面的数据一部分来自原有的，一部分来自 WebStorageProxy 实例对象。那么如果我们支持不使用命名空间也能加密的话，就势必要时刻监控每个变量的状态变化，哪个是原有的数据，哪个是实例的数据，哪个从原有的数据变为了实例的数据。如果这样做，那么程序就会变得极其复杂。而且我们为 WebStorageProxy 实例对象提供了 destory 方法，而在 destory 之前究竟要不要对已经加密的数据进行解密处理？这又是一个问题！所以，出于这么多方面的考虑。我将 WebStorageProxy 设计为在不使用命名空间时， 不能使用加密策略。 

使用命名空间就意味着私密，只有 WebStorageProxy 实例对象才能访问。事实上也正是如此：

```javascript
new WebStorageProxy('sessionStorage'，'yinchengnuo')
```

当你执行了上面的代码，打开控制台。你就会发现 sessionStorage 里面多了一条数据，它的 key 为：

>_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo

value 为空：

现在让我们尝试获取它一下：

```javascript
new WebStorageProxy('sessionStorage'，'yinchengnuo')
sessionStorage.getItem('_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo')  //false
```

是的，是 false。因为在 实例化 WebStorageProxy 的时候，WebStorageProxy 已经重写了 Storage.prototype 上面的 clear()、getItem()、setItem()、removeItem()四个方法。使得它们在处理指定 key 值的数据时会选择忽略。因此使用命名空间就意味着私密，除了 WebStorageProxy 实例，外部无法修改。
但是并不是真的无法修改，因为我们在重写这四个方法的同时并没有丢弃它们，而是用另外一种方式将它们放在了 Storage.prototype 上。如果这个时候你在控制台输入 Storage。prototype 并回车的话，就会看到 Storage。prototype 上面多了四个属性：

- Symbol('clear')
- Symbol('getItem')
- Symbol('setItem')
- Symbol('removeItem')

没错，这四个属性值就是原生的 clear()、getItem()、setItem()、removeItem()四个方法。如何使用它们呢？看下源码就知道了：

```javascript
WebStorageProxy.prototype._CLEAR = Symbol('clear') 
WebStorageProxy.prototype._GETITEM = Symbol('getItem')
WebStorageProxy.prototype._SETITEM = Symbol('setItem')
WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem')
```

没错，我把 Storage.prototype 上四个存储原生方法的属性名得引用放在 WebStorageProxy.prototype 上。这样就能进一步保证这四个方法的安全。如果你想恢复这四个方法，只需要在销毁实例时，将 destory 方法的第二个参数设置为 true 就好了。那么现在我们再来获取下 _WEBSTORAGEPROXY_NAMESPACE:yinchengnuo 的值看一看：

```javascript
new WebStorageProxy('sessionStorage'，'yinchengnuo')
sessionStorage[WebStorageProxy.prototype._GETITEM]('_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo')  //''
```

这样就能获取命名空间的值了。当然 WebStorageProxy 也提供了一些 API 来操作命名空间。

|       方法   | 参数           |       描述    |
| ------------ | ------------- | ----------  |
|   ***use***  |  string/null  | 切换命名空间，参数为空时不使用命名空间（切换到全局）|     
|   ***del***  |  string       | 删除命名空间，参数为要删除的命名空间名字。如果为当前命名空间，删除前自动执行use()|
| ***namespace***|null| 返回当前命名空间的名字 |
| ***namespaces***|null| 返回所有命名空间的名字 |

## 数据加密

WebStorageProxy 支持自定义的加密策略。允许使用自定义函数来对命名空间之中的数据进行存储。

首先你需要准备两个纯函数，用于加密解密字符串。比如我准备的两个：

```javascript
const encryption = str => {
	let string = escape(str)
	let len = string.length;
	let result = ''
	for (let i = 0; i < len; i ++) {
		result += String.fromCharCode(string.charCodeAt(i) + i + 23)
	}
	return result
}
const decryption = str => {
	let string = str
	let len = string.length;
	let result = ''
	for (let i = 0; i < len; i ++) {
		result += String.fromCharCode(string.charCodeAt(i) - i - 23)
	}
	return unescape(result)
}
```

然后在实例化 WebStorageProxy 之前调用 WebStorageProxy 上的 crypto() 方法：

```javascript
WebStorageProxy.crypto(encryption, decryption)
```

***一定要保证在全局第一次实例化 WebStorageProxy 之前调用 crypto() ，否则加密策略不生效。也因此一个 session 只允许一种加密策略***。

此时我们再来看一看，被加密之后的数据变成什么样了：

```javascript
let storage = new WebStorageProxy('sessionStorage'，'yinchengnuo')
storage.data= {
	name: 'yinchengnuo',
	age: 23,
	skills: ['web', 'guitar']
}
sessionStorage[WebStorageProxy.prototype._GETITEM]('_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo')
//<O[?MNFTUIXgL_kO]^ ¨ªWefZix]p|`no¬ ­¦guvjym{|Äµ»±·µ¿¹ÁÉÄ{~ÀÇÆ¨¯ ¡ãÜÛßàè©ª­¼¡²À¤²³ùèæª¸¹­»Í°¾¿õĄùąóą¹ÇÈ¼ÍÝ¿ÒàÂÕãÅØæ
```

是的，使用加密策略之后。存储到 webStorage 里的数据就变成了一堆乱码。如果有人或者脚本想要窃取你的数据。那他可能就要费点功夫了。数据加密的使用也还是一如以往的简单。但是你可能会问一个问题：那就是 WebStorageProxy 提供的加密策略足够安全嘛？

### 安全问题

***WebStorageProxy强烈不建议你将敏感数据保存在本地。同时也不能保证你存储在本地的加密数据绝对安全。因为这不仅仅取决于于你提供的加密函数，而且这种加密解密的过程类似密钥为加密解密函数的对称加密算法。一旦你的密钥（加密解密函数算法）泄露，数据加密也就失去了意义。同时加密数据也不是 WebStorageProxy 开发的初衷。如果你熟悉 WebStorageProxy 的源码，你会发现解密这些经过加密的数据轻而易举。所以 WebStorageProxy 的加密策略只是为了实现将保存在本地的数据不是明文的形式呈现***。

来看下源码：

```javascript
export default new Proxy(WebStorageProxy, {
	get (target, key) {
		if (key === 'crypto') {
			if (!target.prototype.encryption && !Storage.prototype[WebStorageProxy.prototype._GETITEM]) {
				return (...args) => {
					if (args.length == 2 && isFunction(args[0]) && isFunction(args[1])) {
						args.forEach((e, i) => {
							target.prototype[i ? 'decryption' : 'encryption'] = new Proxy(e, {
								apply (target, ctx, args) {
									if (proto(ctx) === WebStorageProxy.prototype) {
										return Reflect.apply(target, ctx, args) 
									}
									return false
								}
							})
						})
						Object.freeze(target.prototype)
					}
				}
			} else {
				return false
			}
		}
		return Reflect.get(target, key)
	}
}）
```

被写入原型链的 decryption() 和 encryption() 方法不能被外部调用。只能被 WebStorageProxy 的实例对象调用。但是你可能记得刚刚我们调用 webStorage 原生方法时：

```javascript
sessionStorage[WebStorageProxy.prototype._GETITEM]('_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo')
```

就像这样，我们只要稍微改动一下： 

```javascript
WebStorageProxy.prototype.decryption.call((new WebStorageProxy('localStorage')).__proto__, sessionStorage[WebStorageProxy.prototype._GETITEM]('_WEBSTORAGEPROXY_NAMESPACE:yinchengnuo'))
//"{"name":"yinchengnuo","age":23,"skills":["web","guitar"]}"
```

就解密了经过加密策略加密的数据！！！


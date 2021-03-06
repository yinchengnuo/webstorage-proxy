export const ret0 = () => ({ length: 0 })  //初始化时没有配置钩子函数时返回的钩子函数列表
export const ret1 = fun => ({  //初始化时配置钩子函数时返回的钩子函数列表
    0: fun,
    length: 1
})
export const callLifeCircleList = (funArr, that, ...arg) => {  //遍历执行钩子函数列表
    for (let i = 0; i < funArr.length; i ++){
        funArr[i].call(that, ...arg)
    } 
}
export const lifeCircleNameCheck = name => {  //检查要追加或获取的钩子函数名称是否存在
    return name === 'beforeGet' ||
    name === 'geted' ||
    name === 'beforeSet' ||
    name === 'proxySeted' ||
    name === 'storageSeted' ||
    name === 'storageChanged' ||
    name === '_NAMESPACE' ||
    name === '_DELETENOMAPTOSTORAGE'
}
export const proxyLifeCircleList = state => {  //代理钩子列表使得只能添加不能删除钩子函数
    return new Proxy(state, {
        set(target, key, value) {
            if (key == target.length && typeof value === 'function') {
                Reflect.set(target, key, value)
                target.length = target.length += 1
                return true
            }
        },
        deleteProperty() {
            return false
        }
    })
}
export const defaultLifeCircle = that => {  //初始化时没有配置任何钩子函数时的默认操作
    that.beforeCreate = function() {}
    that.created = function() {}
    that.beforeGet = proxyLifeCircleList(ret0())
    that.geted = proxyLifeCircleList(ret0())
    that.beforeSet = proxyLifeCircleList(ret0())
    that.proxySeted = proxyLifeCircleList(ret0())
    that.storageSeted = proxyLifeCircleList(ret0())
    that.beforeDel = proxyLifeCircleList(ret0())
    that.proxyDeled = proxyLifeCircleList(ret0())
    that.storageDeled = proxyLifeCircleList(ret0())
    that.storageChanged = proxyLifeCircleList(ret0())
    that.beforeDestroy = function() {}
    that.destroyed = function() {}
}
export const dispatch = (type, that, key, newValue, oldValue) => {  //触发sessionstoragechange/localstoragechange事件
    window.dispatchEvent(new StorageEvent(type, {
        key,
        newValue,
        oldValue,
        storageArea: that,
        url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
    }))
}
export const nameSpaceDispatch = (that, type, storageArea, key, newValue, oldValue) => {  //触发sessionstoragechange/localstoragechange事件
    let len = that.storageChanged.length
    for(let i = 0; i < len; i ++) {
        that.storageChanged[i].call(that, new StorageEvent(type, {
            key,
            newValue,
            oldValue,
            storageArea,
            url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]       
        }))
    }
}
export const nameSpaceCheck = (that, nameSpace) => {  //检测命名空间类型，
    if (typeof nameSpace === 'string') {  //如果为字符串就直接赋值
        that._NAMESPACE = nameSpace
    } else if (typeof nameSpace === 'function') {  //如果为函数就执行，并把所有已经存在的命名空间名称放在数组作为参数传入
        let nameSpacesArr = []
        let regExp = new RegExp(`${that._WEBSTORAGEPROXY_NAMESPACE}:`)
        for (let i = 0; i < window[that._TYPE].length; i ++) {
            if (window[that._TYPE].key(i).match(regExp)) {
                nameSpacesArr.push(window[that._TYPE].key(i).replace(regExp, ''))
            }
        }
        that._NAMESPACE = typeof nameSpace(nameSpacesArr) === 'string' ? nameSpace(nameSpacesArr) : null
        nameSpacesArr = null
        regExp = null
    } else {
        that._NAMESPACE = null
    }
}
export const isString = i => {  //类型判断：string
    return typeof i === 'string'
}
export const isBoolean = i => typeof i === 'boolean'
export const isFunction = i => Object.prototype.toString.call(i) === '[object Function]'
export const isObject = i =>  Object.prototype.toString.call(i) === '[object Object]'
export const isArray = i => Object.prototype.toString.call(i) === '[object Array]'
export const isPrivate = (proto, key) => (key.split(':')[0] === proto._WEBSTORAGEPROXY_NAMESPACE) || (key.split(':')[0] === proto._WEBSTORAGEPROXY_INDENT_STORAGE)
export const proto = i => {  //获取对象原型
    return Object.getPrototypeOf(i)
}
export const listen = that => {  //监听 localStorage 变动
    window.addEventListener('storage', e => {
        if (that._NAMESPACE) {
            let regExp = new RegExp(`${that._WEBSTORAGEPROXY_NAMESPACE}:`)
            if (e.key.match(regExp) && e.key.split(':')[1] === that._NAMESPACE) {
                if (isFunction(that.decryption)) {
                    Object.assign(that.state, JSON.parse(that.decryption(e.newValue)))
                }
            }
        } else {
            if (!isPrivate(e.key)) {
                that.state[e.key] = e.newValue
            }
        }
    })
}
export const clearState = that => {
    proto(that)._DELETENOMAPTOSTORAGE = true
    Object.keys(that.state).forEach(e => delete that.state[e])
    proto(that)._DELETENOMAPTOSTORAGE = false
}

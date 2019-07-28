import { nameSpaceCheck } from './util'
const proxy = state => {
    return new Proxy(state, {
        set(target, key, value) {
            if (key == target.length && typeof value === 'function') {
                target[key] = value
                target.length = target.length += 1
                return true
            }
        },
        deleteProperty() {
            return false
        }
    })
}
const ret0 = () => ({ length: 0 })
const ret1 = fun => ({
    0: fun,
    length: 1
})
const defaultConf = function() {
    this.beforeCreate = function() {}
    this.created = function() {}
    this.beforeGet = proxy(ret0())
    this.geted = proxy(ret0())
    this.beforeSet = proxy(ret0())
    this.proxySeted = proxy(ret0())
    this.storageSeted = proxy(ret0())
    this.storageChanged = proxy(ret0())
    this.beforeDestroy = function() {}
    this.destroyed = function() {}
}
export default function(arg) {
    if (arg.length) {
        if (arg.length == 1) {
            if (typeof arg[0] === 'string') {
                this._TYPE = arg[0]
                this._NAMESPACE = null
                defaultConf.call(this)
            } else if (arg[0].toString() === '[object Object]') {
                this._TYPE = arg[0].type
                nameSpaceCheck(this, arg[0].nameSpace)
                typeof arg[0].beforeCreate === 'function' ? this.beforeCreate = arg[0].beforeCreate : function() {}
                typeof arg[0].created === 'function' ? this.created = arg[0].created : function() {}
                typeof arg[0].beforeGet === 'function' ? this.beforeGet = proxy(ret1(arg[0].beforeGet)) : proxy(ret0())
                typeof arg[0].geted === 'function' ? this.geted = proxy(ret1(arg[0].geted)) : proxy(ret0())
                typeof arg[0].beforeSet === 'function' ? this.beforeSet = proxy(ret1(arg[0].beforeSet)) : proxy(ret0())
                typeof arg[0].proxySeted === 'function' ? this.proxySeted = proxy(ret1(arg[0].proxySeted)) : proxy(ret0())
                typeof arg[0].storageSeted === 'function' ? this.storageSeted = proxy(ret1(arg[0].storageSeted)) : proxy(ret0())
                typeof arg[0].storageChanged === 'function' ? this.storageChanged = proxy(ret1(arg[0].storageChanged)) : proxy(ret0())
                typeof arg[0].beforeDestroy === 'function' ? this.beforeDestroy = arg[0].beforeDestroy : function() {}
                typeof arg[0].destroyed === 'function' ? this.destroyed = arg[0].destroyed : function() {}
            }
        } else {
            this._TYPE = arg[0]
            nameSpaceCheck(this, arg[2])
            defaultConf.call(this)
        }
    } else throw new ReferenceError('the length of arguments in WebStorageProxy can not be 0')
}
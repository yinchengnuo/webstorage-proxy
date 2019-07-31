import map from './util/map'
import proxy from './util/proxy'
import merge from './util/merge'
import { clearState, proto, listen, isPrivate } from './util/util'

export default class WebStorageProxy {  //WebStorageProxy 本尊
    constructor(...arg) {
        return (self => {
            merge.call(self, arg) //合并配置项
            self.beforeCreate.call(window) //执行beforeCreate钩子函数
            self.state = Object.create(self) //定义当前对象的状态
            map.call(self) //将storage映射到state上
            proxy.call(self)  //在state上部署Proxy
            Promise.resolve().then(() => { //挂载created钩子函数
                self.created()  //执行created钩子函数
            })
            self._TYPE === 'localStorage' && listen(self)
            return self.state   //返回state
        })(this)
    }
    all () {
        return JSON.parse(JSON.stringify(this.state))
    }
    use (namespace) {
        if (namespace && namespace !== this._NAMESPACE) {
            proto(this)._NAMESPACE = namespace
            clearState(this)
            map.call(this)
            return true
        }
    }
    del (namespace) {
        (this._NAMESPACEe && this._NAMESPACE === namespace) && this.use()
        window[this._TYPE][proto(this)._REMOVEITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${namespace}`)
        return true
    }
    has (key) {
        return key in this.state
    }
    clear () {
        if (this._NAMESPACE) {
            window[this._TYPE][proto(this)._SETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`, '')
            return true
        }
        const clear = i => {
            while(i < window[this._TYPE].length) {
                if (isPrivate(proto(this), window[this._TYPE].key(i))) {
                    i ++
                } else {
                    window[this._TYPE].removeItem(window[this._TYPE].key(i))
                }
            }
            return clear
        }
        clear(0)(0)
        clearState(this)
        return true        
    }
    namespace () {
        return this._NAMESPACE
    }
    namespaces () {
        let arr = []
        let storage = window[this._TYPE]
        let len = storage.length
        for(let i = 0; i < len; i ++) {
            if (window[this._TYPE].key(i).split(':')[0] === proto(this)._WEBSTORAGEPROXY_NAMESPACE) {
                arr.push(window[this._TYPE].key(i).split(':')[1])
            }
        }
        return arr
    }
    destroy (del, b) {
        this.beforeDestroy.call(this) //执行beforeDestroy钩子函数
        del && this.clear()
        if (b) {
            let p = Storage.prototype
            p.clear = p[this._CLEAR]
            delete p[this._CLEAR]
            p.setItem = p[this._SETITEM]
            delete p[this._SETITEM]
            p.getItem = p[this._GETITEM]
            delete p[this._GETITEM]
            p.removeItem = p[this._REMOVEITEM]
            delete p[this._REMOVEITEM]
        }
        window._WebStorageProxyDestoryedFun = this.destroyed
        this.revoke()
        Promise.resolve().then(() => { //挂载destroyed钩子函数
            window._WebStorageProxyDestoryedFun.call(window)  //执行destroyed钩子函数
            delete window._WebStorageProxyDestoryedFun
        })
    }
}


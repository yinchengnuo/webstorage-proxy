import merge from './util/merge'
import map from './prototype/map'
import proxy from './prototype/proxy'
import override from './util/override'

class WebStorageProxy {
    constructor(...arg) {
        return this.init(arg)
    }
    init(arg) {
        merge.call(this, arg) //合并配置项
        if (sessionStorage.getItem(this._WEBSTORAGEPROXY_STROAGE_OVERRODE) === null) {
            override(WebStorageProxy.prototype)
        }
        this.beforeCreate.call(window) //执行beforeCreate钩子函数
        Promise.resolve().then(() => { //挂载created钩子函数
            this.created()
        })
        this.state = Object.create(this) //定义当前对象的状态
        this.state.map() //将storage映射到state上
        return this.state.proxy()
    }
    map() {
        map.call(this)
    }
    proxy() {
        proxy.call(this)
    }
}

WebStorageProxy.prototype._CLEAR = Symbol('clear')
WebStorageProxy.prototype._GETITEM = Symbol('getItem')
WebStorageProxy.prototype._SETITEM = Symbol('setItem')
WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem')
WebStorageProxy.prototype._WEBSTORAGEPROXY = '_WEBSTORAGEPROXY' //WebStorageProxy对象控制的数据的私有前缀
WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE' //WebStorageProxy对象控制的具有命名空间的数据的私有前缀
WebStorageProxy.prototype._WEBSTORAGEPROXY_STROAGE_OVERRODE = '_WEBSTORAGEPROXY_STROAGE_OVERRODE' //检测是否已经重写 Storage 的 key

export default WebStorageProxy
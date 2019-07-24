import map from './prototype/map'
import merge from './util/merge'
import proxy from './prototype/proxy'
import rewrite from './prototype/rewrite'

class WebStorageProxy {
    constructor (...arg) {
        this.init(arg)
        this.state = Object.create(this)  //定义当前对象的状态
        this.state.map()  //将storage映射到state上
        return this.state.proxy()    
    }
    init (arg) {
        this._WEBSTORAGEPROXY = '_WEBSTORAGEPROXY'  //WebStorageProxy对象控制的数据的私有前缀
        this._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE'  //WebStorageProxy对象控制的具有命名空间的数据的私有前缀
        this._WEBSTORAGEPROXY_NEWED_KEY = '_WEBSTORAGEPROXY_NEWED_KEY'  //判断此类是否已经new了的key 
        merge.call(this, arg) //合并配置项
        window[this._TYPE].getItem(this._WEBSTORAGEPROXY_NEWED_KEY)  //阻止多次new此类
        this.boforedCreate.call(window)  //执行beforeCreate钩子函数
        Promise.resolve().then(() => {  //挂载created钩子函数
            this.created()
        })
        this.rewrite()
    }
    rewrite () {
        rewrite.call(this)
    }
    proxy () {
        proxy.call(this)
    }
    map () {
        map.call(this)
    }
}

export default WebStorageProxy
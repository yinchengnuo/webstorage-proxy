import all from './prototype/all'

import map from './util/map'
import proxy from './util/proxy'
import merge from './util/merge'
import rewrite from './util/rewrite'

export default class WebStorageProxy {
    constructor(...arg) {
        return ((that) => {
            merge.call(that, arg) //合并配置项
            if (!Storage.prototype[WebStorageProxy.prototype._GETITEM]) {  //检测Storage上的方法是否被重写
                console.log(88888888)
                rewrite(WebStorageProxy.prototype)
            }
            that.beforeCreate.call(window) //执行beforeCreate钩子函数
            Promise.resolve().then(() => { //挂载created钩子函数
                that.created()
            })
            that.state = Object.create(that) //定义当前对象的状态
            map.call(that) //将storage映射到state上
            proxy.call(that)  //部署Proxy
            return that.state 
        })(this)
    }
    all () {
        return all.call(this)
    }
    use () {

    }
    del () {

    }
    has () {

    }
    clear () {
        
    }
}


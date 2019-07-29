import all from './prototype/all'
// import use from './prototype/use'
// import del from './prototype/del'
// import has from './prototype/has'
// import clear from './prototype/clear'

import map from './util/map'
import proxy from './util/proxy'
import merge from './util/merge'

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
            return self.state   //返回state
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


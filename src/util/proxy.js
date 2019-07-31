import update from './update'
import {
    proto,  //获取对象原型
    isArray,  //类型判断：array
    isObject,  //类型判断：object
    isPrivate,
    isFunction,  //类型判断：function
    callLifeCircleList,  //遍历执行钩子函数列表
    lifeCircleNameCheck  //检查要追加或获取的钩子函数名称是否存在
} from './util'

export default function() {  //递归代理state
    const self = this  //保存this引用
    const proxy = state => {  //定义proxy函数
        Object.keys(state).forEach(e => {  //遍历传进来的对象
            if (isArray(state[e]) || isObject(state[e])) {  //属性值是对象或数组就递归
                state[e] = proxy(state[e]).proxy
            }
        })
        return Proxy.revocable(state, {  //代理传进来的对象或数组
            get(target, key) {  //代理get
                if (lifeCircleNameCheck(key && proto(state) === self)) {  //当key为钩子函数时返回钩子函数列表
                    return self[key]
                } else {  //否则就是正常取值
                    callLifeCircleList(self.beforeGet, target, key)  //遍历执行beforeGet钩子函数列表
                    Promise.resolve().then(() => {
                        callLifeCircleList(self.geted, target, key)  //遍历执行geted钩子函数列表
                    })
                    return target[key]
                }
            },
            set(target, key, value) {  //代理set
                if (isFunction(value) && lifeCircleNameCheck(key) && proto(state) === self) {  //当key为钩子函数时将其放入钩子函数列表
                    self[key][self[key].length] = value
                    return true
                } else if (lifeCircleNameCheck(key)) {
                    Reflect.set(target, key, value)
                    return true
                } else { 
                    if (target[key] !== value) {  //当newValue !== oldValue 时才进行下一步
                        callLifeCircleList(self.beforeSet, target, key, value)  //遍历执行beforeSet钩子函数列表
                        const oldState = JSON.parse(JSON.stringify(self.state))  //set赋值之前先备份当前state
                        if (isArray(value) || isObject(value)) {  //当set的属性值为对象或数组时
                            target[key] = proxy(value)  //对属性值做代理再赋值给目标对象
                        } else {  //当set的属性值为原始值时直接赋值
                            target[key] = value
                        }
                        callLifeCircleList(self.proxySeted, target, key, value)  //遍历执行proxySeted钩子函数列表
                        update.call(self, oldState, target, key, value)  //更新storage
                        callLifeCircleList(self.storageSeted, target, key, value)  //遍历执行storageSeted钩子函数列表
                        return true
                    }
                }
                return false
            },
            deleteProperty (target, key) {
                if (key in target && !self._DELETENOMAPTOSTORAGE) {
                    if (isPrivate(key)) {
                        return false
                    }
                    const oldState = JSON.parse(JSON.stringify(self.state))  //set赋值之前先备份当前state
                    callLifeCircleList(self.beforeDel, target, key)  //遍历执行beforeSet钩子函数列表
                    Reflect.deleteProperty(target, key)
                    callLifeCircleList(self.proxyDeled, target, target, key)  //遍历执行proxySeted钩子函数列表
                    update.call(self, oldState, target, key)  //更新storage
                    callLifeCircleList(self.storageDeled, target, key)  //遍历执行storageSeted钩子函数列表
                    return true
                } else if (self._DELETENOMAPTOSTORAGE) {
                    Reflect.deleteProperty(target, key)
                    return true
                }
                return false
            }
        })
    }
    let cancalProxy =  proxy(this.state)
    this.state = cancalProxy.proxy
    this.revoke = cancalProxy.revoke
}
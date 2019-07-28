import update from './update'
import { lifeCircleNameCheck, callFunArr } from './util'

export default function() {
    console.log(this.state)
    const proxy = state => {
        const that = this
        const proxyObj = new Proxy(state, {
            get(target, key) {
                if (lifeCircleNameCheck(key)) {
                    return that[key]
                } else {
                    callFunArr(that.beforeGet, target, target, key)
                    Promise.resolve().then(() => {
                        callFunArr(that.geted, target, target, key)
                    })
                    return target[key]
                }
            },
            set(target, key, value) {
                if (typeof value === 'function' && lifeCircleNameCheck(key)) {
                    that[key][that[key].length] = value
                } else {
                    if (target[key] !== value) {
                        callFunArr(that.beforeSet, target, target, key, value)
                        if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
                            target[key] = proxy(value)
                        } else {
                            target[key] = value
                        }
                        callFunArr(that.proxySeted, target, target, key, value)
                        // that.encryption('abcd')
                        console.log('更新storage', target, key, value)
                        update.call(that, key, value)
                    }
                }
            }
        })
        Object.keys(state).forEach(e => {
            if (Object.prototype.toString.call(state[e]) === '[object Object]' || Object.prototype.toString.call(state[e]) === '[object Array]') {
                state[e] = proxy(state[e])
            }
        })
        return proxyObj
    }
    this.state = proxy(this.state)
}
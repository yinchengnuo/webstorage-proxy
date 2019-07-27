import { checkName, callFunArr } from './util'

export default function() {
    const proxy = state => {
        const that = this
        const proxyObj = new Proxy(state, {
            get(target, key) {
                if (checkName(key)) {
                    return that[key]
                } else {
                    callFunArr(that.beforeGet, target, key)
                    Promise.resolve().then(() => {
                        callFunArr(that.geted, target, key)
                    })
                    return target[key]
                }
            },
            set(target, key, value) {
                if (typeof value === 'function' && checkName(key)) {
                    that[key][that[key].length] = value
                } else {
                    callFunArr(that.beforeSet, target, key, value)
                    if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
                        target[key] = proxy(value)
                    } else {
                        target[key] = value
                    }
                    callFunArr(that.proxySeted, target, key, value)
                    console.log('更新storage')
                }
            }
        })
        Object.keys(state).forEach(e => {
            if (Object.prototype.toString.call(e) === '[object Object]' || Object.prototype.toString.call(e) === '[object Array]') {
                state[e] = proxy(state[e])
            }
        })
        return proxyObj
    }
    this.state = proxy(this.state)
}
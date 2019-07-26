import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export default function () {
    const proxy = state => {
        const WebStorageProxy = this
        const proxyObj = new Proxy(state, {
            get (target, key) {
                WebStorageProxy.beforeGet.call(target, key)
                Promise.resolve().then(() => {
                    WebStorageProxy.geted.call(target, key)
                })
                return target[key]
            },
            set(target, key, value) {
                WebStorageProxy.beforeSet.call(target, key, value)
                if (typeof value === 'function') {
                    console.log('isFunction')
                } else {
                    if (isObject(value) || isArray(value)) {
                        target[key] = proxy(value)
                    }  else {
                        target[key] = value
                    }
                }
                WebStorageProxy.proxySeted.call(target, key, value)
                console.log('更新storage')
            }
        })
        Object.keys(state).forEach(e => {
            if (isObject(e) || isArray(e)) {
                state[e] = proxy(state[e])
            }
        })
        return proxyObj
    }
    this.state = proxy(this.state)
}
import WebStorageProxy from './WebStorageProxy'
import prototype from './util/prototype'

prototype(WebStorageProxy)  

export default new Proxy(WebStorageProxy, {
    get (...arg) {
        if (arg[1] === 'encryption' || arg[1] === 'decryption') {
            if (!arg[0].prototype[arg[1]]) {
                return fun => {
                    arg[0].prototype[arg[1]] = new Proxy(fun, {
                        apply (target, ctx, args) {
                            if (ctx._TYPE) {
                               return Reflect.apply(...args) 
                            }
                            return false
                        }
                    })
                }
            }
        }
        return Reflect.get(...arg)
    }
})
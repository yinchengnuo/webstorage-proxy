import WebStorageProxy from './WebStorageProxy'
import prototype from './util/prototype'
import rewrite from './util/rewrite'
import { proto, isFunction } from './util/util'

prototype(WebStorageProxy)

export default new Proxy(WebStorageProxy, {  //代理 WebStorageProxy
    get (target, key) {  //使得通过 WebStorageProxy.crypto 时能够将 encryption/decryption(encryptionFun) 两个方法挂载到原型上
        if (key === 'crypto') {
            if (!target.prototype.encryption && !Storage.prototype[WebStorageProxy.prototype._GETITEM]) {  //只有在原型上没有这两个方法且Storage没有被重写时才允许挂载
                return (...args) => {  //返回一个接受加密解密函数的函数，执行后挂载
                    if (args.length == 2 && isFunction(args[0]) && isFunction(args[1])) {
                        args.forEach((e, i) => {
                            target.prototype[i ? 'decryption' : 'encryption'] = new Proxy(e, {  //挂载前对这两个方法进行代理，使它们不能被外部调用
                                apply (target, ctx, args) {  //只有由 WebStorageProxy 生成的对象才能调用
                                    if (proto(ctx) === WebStorageProxy.prototype) {
                                       return Reflect.apply(target, ctx, args) 
                                    }
                                    return false
                                }
                            })
                        })
                        Object.freeze(target.prototype)  //部署加密解密函数后冻结WebStorageProxy.prototype
                    }
                }
            } else {
                return false
            }
        }
        return Reflect.get(target, key)
    },
    construct (...args) {  //在被 new 时简单判断下是否传参
        if (args[1].length) {
            if (!Storage.prototype[WebStorageProxy.prototype._GETITEM]) {  //检测Storage上的方法是否被重写
                rewrite(WebStorageProxy.prototype)  //如果没重写就重写
            }
            return Reflect.construct(...args)
        } 
        return new ReferenceError('the length of arguments in WebStorageProxy can not be 0')  //没传参数返回错误对象
    }
})
import staticMount from './static/staticMount'
import CookieProxy from './cookie/CookieProxy'
import StorageProxy from './storage/StorageProxy'
import IndexDBProxy from './indexDB/IndexDBProxy'
import isObject from 'lodash/isObject'
import error from './util/error'

//staticMount 为 WebStorageProxy 上挂载一些静态方法
//new WebStorageProxy 时根据传进来的类型进行分发

export default staticMount(class WebStorageProxy {
    constructor (option) {
        if (isObject(option)) {
            switch (option.type) {
                case 'cookie': {
                    return new CookieProxy(option)
                }
                case 'sessionStorage' || 'localStorage': {
                    return new StorageProxy(option)
                }
                case 'indexDB': {
                    return new IndexDBProxy(option)
                }
                default: {
                    return error('TypeError', `参数不合法！type应是'coookie'、'sessionSorage'、'localStorage'、'indexDB'中的一个。`)
                }
            }
        } else {
            return error('TypeError', `参数不合法！WebStorageProxy的参数必须是一个对象。`)
        }
    }
})

import CookieProxy from '../cookie/CookieProxy'
import StorageProxy from '../storage/StorageProxy'
import IndexDBProxy from '../indexDB/IndexDBProxy'
import error from './error'

export default function (arg) {
    switch (arg[0]) {
        case 'cookie': {
            return new CookieProxy(...arg)
        }
        case 'sessionStorage' || 'localStorage': {
            console.log(...arg)
            return new StorageProxy(...arg)
        }
        case 'indexDB': {
            return new IndexDBProxy(...arg)
        }
        default: {
            return error('TypeError', `参数不合法!第一个参数（最少时唯一的参数）应该是'coookie'、'sessionSorage'、'localStorage'、'indexDB'中的一个。`)
        }
    }
}
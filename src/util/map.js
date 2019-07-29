import { isFunction } from './util'

export default function() {  //将sessionStorage/localStorage映射到state上
    if (this._NAMESPACE) {  //当配置对象有命名空间时
        let data = window[this._TYPE][this._GETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`)
        if (data) {  //如果 sessionStorage/localStorage 里有命名空间标记的数据就映射到state上
            if (isFunction(this.encryption) && isFunction(this.decryption)) {
                Object.assign(this.state, JSON.parse(this.decryption(data)))
            } else {
                Object.assign(this.state, JSON.parse(data))
            }
            data = null
        } else {  //如果没有就在 sessionStorage/localStorage 创建值为空的命名空间
            window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`, '')
        }
    } else {  //当配置对象没有命名空间时，就把 sessionStorage/localStorage 里面的非命名空间数据遍历到state上
        let storage = window[this._TYPE]
        let regExp1 = new RegExp(`${this._WEBSTORAGEPROXY_NAMESPACE}:`)
        let regExp2 = new RegExp(`${this._WEBSTORAGEPROXY_INDENT_STORAGE}`)
        for (let i = 0; i < storage.length; i++) {
            if (!storage.key(i).match(regExp1) && !storage.key(i).match(regExp2)) {
                try {
                    this.state[storage.key(i)] = JSON.parse(storage[this._GETITEM](storage.key(i)))
                } catch {
                    this.state[storage.key(i)] = storage[this._GETITEM](storage.key(i))
                }
            }
        }
        storage = null
        regExp1 = null
        regExp2 = null
    }
}
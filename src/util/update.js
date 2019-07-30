import { dispatch, nameSpaceDispatch, isArray, isObject } from './util'

export default function (oldValue, ...args) {
    let storage = window[this._TYPE]
    let key = args[1]
    let value = storage[this._GETITEM](key)
    if (this._NAMESPACE) {
        let spacename = `_WEBSTORAGEPROXY_INDENT_STORAGE:${this._NAMESPACE}`
        storage[this._SETITEM](spacename, this.encryption(JSON.stringify(this.state)))
        nameSpaceDispatch.call(storage, this, this._TYPE.toLowerCase() + 'change', storage, spacename, this.encryption(JSON.stringify(this.state)), value)
        // dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, spacename, this.encryption(JSON.stringify(this.state)), value)  //开发时使用
        storage = null
        key = null
        value = null
        return true
    } else {
        let keys = Object.keys(this.state)
        for (let i = 0; i < keys.length; i ++) {
            if (isArray(this.state[keys[i]]) || isObject(this.state[keys[i]])) {
                if (JSON.stringify(oldValue[keys[i]]) !== JSON.stringify(this.state[keys[i]])) {
                    storage[this._SETITEM](key, JSON.stringify(this.state[keys[i]]))
                    dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, key, JSON.stringify(this.state[keys[i]]), value)  
                    return true
                }
            } else {
                if (oldValue[keys[i]] !== this.state[keys[i]]) {
                    storage[this._SETITEM](key, this.state[keys[i]])
                    dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, key, JSON.stringify(this.state[keys[i]]), value)  
                    return true
                }
            }
        }
    }
}
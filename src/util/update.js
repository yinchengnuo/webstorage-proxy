import { dispatch } from './util'

export default function () {
    if (this._NAMESPACE) {
        let storage = window[this._TYPE]
        let key = `${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`
        let value = window[this._TYPE][this._GETITEM](key)
        storage[this._SETITEM](key, this.encryption(JSON.stringify(this.state)))
        dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, key, this.encryption(JSON.stringify(this.state)), value)
        storage = null
        key = null
        value = null
        return true
    } else {
        // window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY}:${key}`, value)
    }
}
import { dispatch } from './util'

export default function(proto) {
    localStorage.setItem(proto._WEBSTORAGEPROXY_INDENT_STORAGE, proto._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE)
    sessionStorage.setItem(proto._WEBSTORAGEPROXY_INDENT_STORAGE, proto._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE)
    Storage.prototype[proto._CLEAR] = Storage.prototype.clear
    Storage.prototype[proto._GETITEM] = Storage.prototype.getItem
    Storage.prototype[proto._SETITEM] = Storage.prototype.setItem
    Storage.prototype[proto._REMOVEITEM] = Storage.prototype.removeItem
    const isPrivate = key => (key.split(':')[0] === proto._WEBSTORAGEPROXY_NAMESPACE) || (key.split(':')[0] === proto._WEBSTORAGEPROXY_INDENT_STORAGE)
    Storage.prototype.clear = function() {
        const clear = i => {
            while (i < this.length) {
                if (!isPrivate(this.key(i))) {
                    this[proto._REMOVEITEM](this.key(i))
                } else {
                    i++
                }
            }
        }
        clear(0)
        clear(0)
    }
    Storage.prototype.getItem = function(key) {
        if (!isPrivate(key)) {
            return this[proto._GETITEM](key)
        }
        return false
    }
    Storage.prototype.setItem = function(key, value) {
        if (!isPrivate(key)) {
            let oldValue = this[proto._GETITEM](key)
            if (oldValue !== value) {
                this[proto._SETITEM](key, value)
                this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) && dispatch.call(this, 'sessionstoragechange', this, key, value, oldValue)
                this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) && dispatch.call(this, 'localstoragechange', this, key, value, oldValue)
                return true
            }
        }
        return false
    }
    Storage.prototype.removeItem = function(key) {
        if (!isPrivate(key)) {
            let oldValue = this[proto._GETITEM](key)
            if (oldValue !== null) {
                this[proto._REMOVEITEM](key)
                this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) && dispatch.call(this, 'sessionstoragechange', this, key, null, oldValue)
                this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) && dispatch.call(this, 'localstoragechange', this, key, null, oldValue)
                return true
            }
        }
        return false
    }
}
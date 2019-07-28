import { dispatch } from './util'

export default function(prototype) {
    localStorage.setItem(prototype._WEBSTORAGEPROXY_INDENT_STORAGE, prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE)
    sessionStorage.setItem(prototype._WEBSTORAGEPROXY_INDENT_STORAGE, prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE)
    Storage.prototype[prototype._CLEAR] = Storage.prototype.clear
    Storage.prototype[prototype._GETITEM] = Storage.prototype.getItem
    Storage.prototype[prototype._SETITEM] = Storage.prototype.setItem
    Storage.prototype[prototype._REMOVEITEM] = Storage.prototype.removeItem
    const isPrivate = key => {
        return (key.split(':')[0] === prototype._WEBSTORAGEPROXY) ||
        (key.split(':')[0] === prototype._WEBSTORAGEPROXY_NAMESPACE) ||
        (key.split(':')[0] === prototype._WEBSTORAGEPROXY_INDENT_STORAGE) ||
        (key.split(':')[0] === prototype._WEBSTORAGEPROXY_STROAGE_OVERRODE) 
    }
    Storage.prototype.clear = function() {
        const clear = i => {
            while (i < this.length) {
                if (!isPrivate(this.key(i))) {
                    this[prototype._REMOVEITEM](this.key(i))
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
            return this[prototype._GETITEM](key)
        }
        return false
    }
    Storage.prototype.setItem = function(key, value) {
        if (!isPrivate(key)) {
            let oldValue = this[prototype._GETITEM](key)
            if (oldValue !== value) {
                this[prototype._SETITEM](key, value)
                this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) ||
                dispatch.call(this, 'sessionstoragechange', this, key, value, oldValue) 
                this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) ||
                dispatch.call(this, 'localstoragechange', this, key, value, oldValue) 
                return true
            }
        }
        return false
    }
    Storage.prototype.removeItem = function(key) {
        if (!isPrivate(key)) {
            let oldValue = this[prototype._GETITEM](key)
            if (oldValue !== null) {
                this[prototype._REMOVEITEM](key)
                this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) ||
                dispatch.call(this, 'sessionstoragechange', this, key, null, oldValue) 
                this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) ||
                dispatch.call(this, 'localstoragechange', this, key, null, oldValue) 
                return true
            }
        }
        return false
    }
}
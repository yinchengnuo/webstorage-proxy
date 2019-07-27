import { dispatch } from './util'

export default function(WebStorageProxyPrototype) {
    localStorage.setItem(WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_STORAGE, WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE)
    sessionStorage.setItem(WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_STORAGE, WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE)
    Storage.prototype[WebStorageProxyPrototype._CLEAR] = Storage.prototype.clear
    Storage.prototype[WebStorageProxyPrototype._GETITEM] = Storage.prototype.getItem
    Storage.prototype[WebStorageProxyPrototype._SETITEM] = Storage.prototype.setItem
    Storage.prototype[WebStorageProxyPrototype._REMOVEITEM] = Storage.prototype.removeItem
    const isPrivate = key => {
        return (key.split(':')[0] === WebStorageProxyPrototype._WEBSTORAGEPROXY) ||
        (key.split(':')[0] === WebStorageProxyPrototype._WEBSTORAGEPROXY_NAMESPACE) ||
        (key.split(':')[0] === WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_STORAGE) ||
        (key.split(':')[0] === WebStorageProxyPrototype._WEBSTORAGEPROXY_STROAGE_OVERRODE) 
    }
    Storage.prototype.clear = function() {
        const clear = i => {
            while (i < this.length) {
                if (!isPrivate(this.key(i))) {
                    this[WebStorageProxyPrototype._REMOVEITEM](this.key(i))
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
            return this[WebStorageProxyPrototype._GETITEM](key)
        }
        return false
    }
    Storage.prototype.setItem = function(key, value) {
        if (!isPrivate(key)) {
            let oldValue = this[WebStorageProxyPrototype._GETITEM](key)
            if (oldValue !== value) {
                this[WebStorageProxyPrototype._SETITEM](key, value)
                this[WebStorageProxyPrototype._GETITEM](WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) ||
                dispatch.call(this, 'sessionstoragechange', this, key, value, oldValue) 
                this[WebStorageProxyPrototype._GETITEM](WebStorageProxyPrototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) ||
                dispatch.call(this, 'localstoragechange', this, key, value, oldValue) 
                return true
            }
        }
        return false
    }
    Storage.prototype.removeItem = function(key) {
        if (!isPrivate(key)) {
            this[WebStorageProxyPrototype._REMOVEITEM](key)
        }
        return false
    }
}
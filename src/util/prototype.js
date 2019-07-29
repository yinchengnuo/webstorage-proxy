export default WebStorageProxy => {
    WebStorageProxy.prototype._CLEAR = Symbol('_CLEAR')  //原生 Storage.prototype 上的 clear 方法重新放在 Storage.prototype 上的新 key
    WebStorageProxy.prototype._GETITEM = Symbol('getItem')  //原生 Storage.prototype 上的 getItem 方法重新放在 Storage.prototype 上的新 key
    WebStorageProxy.prototype._SETITEM = Symbol('setItem')  //原生 Storage.prototype 上的 setItem 方法重新放在 Storage.prototype 上的新 key
    WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem')  //原生 Storage.prototype 上的 removeItem 方法重新放在 Storage.prototype 上的新 key
    WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE'  //命名空间标记
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_STORAGE = '_WEBSTORAGEPROXY_INDENT_STORAGE'  //判断sessionStorage/localStorage标识的 key
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE = '_WEBSTORAGEPROXY_INDENT_LOCALSTORAGE'  //判断localStorage标识的 value
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE = '_WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE'  //判断sessionStorage标识的 value
    WebStorageProxy.prototype = new Proxy(WebStorageProxy.prototype, {
        deleteProperty() {
            return false
        }
    })
}
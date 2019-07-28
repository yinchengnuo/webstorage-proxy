export default WebStorageProxy => {
    WebStorageProxy.prototype._CLEAR = Symbol('clear')
    WebStorageProxy.prototype._GETITEM = Symbol('getItem')
    WebStorageProxy.prototype._SETITEM = Symbol('setItem')
    WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem')
    WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE' 
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_STORAGE = '_WEBSTORAGEPROXY_INDENT_STORAGE'
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE = '_WEBSTORAGEPROXY_INDENT_LOCALSTORAGE'
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE = '_WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE'
}
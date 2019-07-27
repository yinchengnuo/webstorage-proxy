export default WebStorageProxy => {
    WebStorageProxy.prototype._CLEAR = Symbol('clear')
    WebStorageProxy.prototype._GETITEM = Symbol('getItem')
    WebStorageProxy.prototype._SETITEM = Symbol('setItem')
    WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem')
    WebStorageProxy.prototype._WEBSTORAGEPROXY = '_WEBSTORAGEPROXY' //WebStorageProxy对象控制的数据的私有前缀
    WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE' //WebStorageProxy对象控制的具有命名空间的数据的私有前缀
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_STORAGE = '_WEBSTORAGEPROXY_INDENT_STORAGE'
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE = '_WEBSTORAGEPROXY_INDENT_LOCALSTORAGE'
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE = '_WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE'
}
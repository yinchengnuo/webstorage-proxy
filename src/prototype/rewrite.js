import error from '../util/error'
export default function() { 
    this.CLEAR = Symbol('clear')
    this.GETITEM = Symbol('getItem')
    this.SETITEM = Symbol('setItem')
    this.REMOVEITEM = Symbol('removeItem')
    const isProvied = key => {
        return key.split(':')[0] === this.flag || key.split(':')[0] === this.nameSpaceFlag 
    }
    const newed = key => {
        return key === this.key
    }
    const throwError = () => error('ReferenceError', `你必须使用 WebStorageProxy 对象的api来操作 WebStorageProxy 产生的数据。`)
    const StorageProxy = this
    const storage = window[StorageProxy.type]
    Storage.prototype[this.CLEAR] = Storage.prototype.clear
    Storage.prototype[this.GETITEM] = Storage.prototype.getItem
    Storage.prototype[this.SETITEM] = Storage.prototype.setItem
    Storage.prototype[this.REMOVEITEM] = Storage.prototype.removeItem
    Storage.prototype.clear = function () {
        for (let i = 0; i < storage.length; i ++) {
            if (!isProvied(storage.key(0))) {
                this.removeItem(storage.key(0))
            }
         }
    }
    Storage.prototype.getItem = function (key) {
        if (isProvied(key)) {
            throwError()
        } else if (newed) {
            throw new ReferenceError(`WebStorageProxy 只能 new 一次。`)
        } else {
            return storage[StorageProxy.GETITEM](key)
        }
    }
    Storage.prototype.setItem = function (key, value) {
        if (isProvied(key)) {
            throwError()
        } else {
            storage[StorageProxy.SETITEM](key, value)
        }
    }
    Storage.prototype.removeItem = function (key) {
        if (isProvied(key)) {
            throwError()
        } else {
            storage[StorageProxy.REMOVEITEM](key)
        }
    }
} 
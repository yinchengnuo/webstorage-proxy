export const callFunArr = (funArr, that, ...arg) => {
    for (let i = 0; i < funArr.length; i ++){
        funArr[i].call(that, ...arg)
    } 
}
export const lifeCircleNameCheck = name => {
    return name === 'beforeGet' ||
    name === 'geted' ||
    name === 'beforeSet' ||
    name === 'proxySeted' ||
    name === 'storageSeted' ||
    name === 'storageChanged' ||
    name === 'beforeBeyond'   
}
export const dispatch = (type, that, key, newValue, oldValue) => {
    window.dispatchEvent(new StorageEvent(type, {
        key,
        newValue,
        oldValue,
        storageArea: that,
        url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
    }))
}
export const nameSpaceCheck = (that, nameSpace) => {
    if (typeof nameSpace === 'string') {
        that._NAMESPACE = nameSpace
    } else if (typeof nameSpace === 'function') {
        const nameSpaces = []
        for (let i = 0; i < window[that._TYPE].length; i ++) {
            if (window[that._TYPE].key(i).match(new RegExp(that._WEBSTORAGEPROXY_NAMESPACE + ':'))) {
                nameSpaces.push(window[that._TYPE].key(i).replace(new RegExp(that._WEBSTORAGEPROXY_NAMESPACE + ':'), ''))
            }
        }
        that._NAMESPACE = nameSpace(nameSpaces)
        nameSpace = null
    } else {
        that._NAMESPACE = null
    }
}

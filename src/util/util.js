export const callFunArr = (funArr, that, ...arg) => {
    for (let i = 0; i < funArr.length; i ++){
        funArr[i].call(that, ...arg)
    } 
}
export const checkName = name => {
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

export default function (nameSpace) {
    if (typeof nameSpace === 'string') {
        this._NAMESPACE = nameSpace
    } else if (typeof nameSpace === 'function') {
        const nameSpaces = []
        for (let i = 0; i < window[this._TYPE].length; i ++) {
            if (window[this._TYPE].key(i).match(new RegExp(this._WEBSTORAGEPROXY_NAMESPACE + ':'))) {
                nameSpaces.push(window[this._TYPE].key(i).replace(new RegExp(this._WEBSTORAGEPROXY_NAMESPACE + ':'), ''))
            }
        }
        this._NAMESPACE = nameSpace(nameSpaces)
    } else {
        this.nameSpace = null
    }
}
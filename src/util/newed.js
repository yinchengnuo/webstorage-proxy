export default function () {
    let that = this
    if (window[this._WEBSTORAGEPROXY]) {
        console.log(window[this._WEBSTORAGEPROXY])
        if (window[this._WEBSTORAGEPROXY][this._TYPE]) {
            return true
        } else {
            window[this._WEBSTORAGEPROXY][this._TYPE] = true
        }
    } else {
        let value = new Proxy(Object.create(null), {
            get (target, key) {
                return target[key]
            },
            set (target, key, value) {
                console.log(key, value)
                if ((!(key in target)) && that._NEWING) {
                    Object.defineProperty(target, key, {
                        value, 
                        configrable: false, 
                        writable: false
                    })
                    return true
                } 
                return false
            }
        })
        Object.defineProperty(window, this._WEBSTORAGEPROXY, {
            value, 
            configrable: false, 
            writable: false
        })
        value = null
        window._WEBSTORAGEPROXY[this._TYPE] = true
    }
}
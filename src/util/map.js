export default function() {
    if (this._NAMESPACE) {
        let json = window[this._TYPE][this._GETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`)
        if (json) {
            Object.assign(this.state, JSON.parse(json))
        } else {
            window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`, '')
        }
    } else {
        for (let i = 0; i < window[this._TYPE].length; i++) {
            if (!window[this._TYPE].key(i).match('_WEBSTORAGEPROXY_NAMESPACE')) {
                try {
                    this.state[window[this._TYPE].key(i)] = JSON.parse(window[this._TYPE][this._GETITEM](window[this._TYPE].key(i)))
                } catch {
                    this.state[window[this._TYPE].key(i)] = window[this._TYPE][this._GETITEM](window[this._TYPE].key(i))
                }
            }
        }
    }
}
import merge from 'lodash/merge'

export default function() {
    if (this._NAMESPACE) {
        let json = window[this._TYPE][this._GETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`)
        if (json) {
            merge(this.state, JSON.parse(json))
        } else {
            window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`, '')
        }
    } else {
        for (let i = 0; i < window[this._TYPE].length; i++) {
            if (!window[this._TYPE].key(i).match('_WEBSTORAGEPROXY_NAMESPACE')) {
                if (window[this._TYPE].key(i).split('_WEBSTORAGEPROXY:')[1]) {
                    try {
                        this.state[window[this._TYPE].key(i).split('_WEBSTORAGEPROXY:')[1]] = JSON.parse(window[this._TYPE][this._GETITEM](window[this._TYPE].key(i)))
                    } catch { 
                        this.state[window[this._TYPE].key(i).split('_WEBSTORAGEPROXY:')[1]] = window[this._TYPE][this._GETITEM](window[this._TYPE].key(i))
                    }
                } else {
                    try {
                        this.state[window[this._TYPE].key(i)] = JSON.parse(window[this._TYPE][this._GETITEM](window[this._TYPE].key(i)))
                    } catch {
                        this.state[window[this._TYPE].key(i)] = window[this._TYPE][this._GETITEM](window[this._TYPE].key(i))
                    }
                }
            }
        }
    }
}
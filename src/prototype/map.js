import merge from 'lodash/merge'

export default function() {
    this.name = 'test'
    if (this._NAMESPACE) {
        let json = window[this._TYPE][this._GETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`)
        if (json) {
            merge(this, JSON.parse(json))
            console.log('mapt', this)
        } else {
            window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY_NAMESPACE}:${this._NAMESPACE}`, '')
        }
    } else {
        for (let i = 0; i < window[this._TYPE].length; i++) {
            // console.log(window[this._TYPE].key(i))
            if (!window[this._TYPE].key(i).match('_WEBSTORAGEPROXY_NAMESPACE')) {
                // try {
                //     this.
                // }
                console.log(window[this._TYPE][this._GETITEM](window[this._TYPE].key(i)))

            }
        }
    }
}
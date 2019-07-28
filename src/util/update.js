export default function (key, value) {
    if (this._NAMESPACE) {

    } else {
        window[this._TYPE][this._SETITEM](`${this._WEBSTORAGEPROXY}:${key}`, value)
    }
    console.log(this._NAMESPACE, key)
}
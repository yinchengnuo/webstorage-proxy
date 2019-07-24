import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import nameSpaceCheck from '../prototype/nameSpaceCheck'

export default function (arg) {
    if (arg.length == 1) {
        if (isString(arg[0])) {
            this._TYPE = arg[0]
            this._MAXSPACE = null
            this._NAMESPACE = null
        } else if (isObject(arg[0])) {
            console.log(233333333)
            this._TYPE = arg[0].type
            this._MAXSPACE = arg[0].maxSpace * 1024 * 1024
            nameSpaceCheck.call(this, arg[0].nameSpace)
            isFunction(arg[0].boforedCreate) ? this.boforedCreate = arg[0].boforedCreate : () => {}  
            isFunction(arg[0].created) ? this.created = arg[0].created : () => {}  
            isFunction(arg[0].beforeGet) ? this.beforeGet = arg[0].beforeGet : () => {}  
            isFunction(arg[0].geted) ? this.geted = arg[0].geted : () => {}  
            isFunction(arg[0].beforeSet) ? this.beforeSet = arg[0].beforeSet : () => {}  
            isFunction(arg[0].proxySeted) ? this.proxySeted = arg[0].proxySeted : () => {}  
            isFunction(arg[0].storageSeted) ? this.storageSeted = arg[0].storageSeted : () => {}  
            isFunction(arg[0].beforeDestroy) ? this.beforeDestroy = arg[0].beforeDestroy : () => {}  
            isFunction(arg[0].destroyed) ? this.destroyed = arg[0].destroyed : () => {}  
            isFunction(arg[0].beforeBeyond) ? this.beforeBeyond = arg[0].beforeBeyond : () => {}  
            isFunction(arg[0].encryption) ? this.encryption = arg[0].encryption : () => {}  
            isFunction(arg[0].decryption) ? this.decryption = arg[0].decryption : () => {}  
        }
    } else {
        this._TYPE = arg[0]
        this._MAXSPACE = arg[1] * 1024 * 1024
        nameSpaceCheck.call(this, arg[2])
    }
}
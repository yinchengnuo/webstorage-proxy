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
            this.beforeCreate = function () {}
            this.created = function () {}
            this.beforeGet = function () {}
            this.geted = function () {}
            this.beforeSet = function () {}
            this.proxySeted = function () {}
            this.storageSeted = function () {}
            this.beforeDestroy = function () {}
            this.destroyed = function () {}
            this.beforeBeyond = function () {}
            this.encryption = function () {}
            this.decryption = function () {}
        } else if (isObject(arg[0])) {
            this._TYPE = arg[0].type
            this._MAXSPACE = arg[0].maxSpace * 1024 * 1024
            nameSpaceCheck.call(this, arg[0].nameSpace)
            isFunction(arg[0].beforeCreate) ? this.beforeCreate = arg[0].beforeCreate : function () {}  
            isFunction(arg[0].created) ? this.created = arg[0].created : function () {}  
            isFunction(arg[0].beforeGet) ? this.beforeGet = arg[0].beforeGet : function () {}  
            isFunction(arg[0].geted) ? this.geted = arg[0].geted : function () {}  
            isFunction(arg[0].beforeSet) ? this.beforeSet = arg[0].beforeSet : function () {}  
            isFunction(arg[0].proxySeted) ? this.proxySeted = arg[0].proxySeted : function () {}  
            isFunction(arg[0].storageSeted) ? this.storageSeted = arg[0].storageSeted : function () {}  
            isFunction(arg[0].beforeDestroy) ? this.beforeDestroy = arg[0].beforeDestroy : function () {}  
            isFunction(arg[0].destroyed) ? this.destroyed = arg[0].destroyed : function () {}  
            isFunction(arg[0].beforeBeyond) ? this.beforeBeyond = arg[0].beforeBeyond : function () {}  
            isFunction(arg[0].encryption) ? this.encryption = arg[0].encryption : function () {}  
            isFunction(arg[0].decryption) ? this.decryption = arg[0].decryption : function () {}  
        }
    } else {
        this._TYPE = arg[0]
        this._MAXSPACE = arg[1] * 1024 * 1024
        nameSpaceCheck.call(this, arg[2])
        this.beforeCreate = function () {}
        this.created = function () {}
        this.beforeGet = function () {}
        this.geted = function () {}
        this.beforeSet = function () {}
        this.proxySeted = function () {}
        this.storageSeted = function () {}
        this.beforeDestroy = function () {}
        this.destroyed = function () {}
        this.beforeBeyond = function () {}
        this.encryption = function () {}
        this.decryption = function () {}
    }
}
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import error from '../util/error'

export default function (nameSpace) {
    if (nameSpace) {
        if (isString(nameSpace)) {
            this.nameSpace = nameSpace
        }else if (isFunction(nameSpace)) {
            const nameSpaces = []
            for (let i = 0; i < window[this.type].length; i ++) {
                if (window[this.type].key(i).match(/_WEBSTORAGEPROXY_NAMESPACE:/)) {
                    nameSpaces.push(window[this.type].key(i).replace(/_WEBSTORAGEPROXY_NAMESPACE:/, ''))
                }
            }
            window[this.type]
            if (isString(nameSpace(nameSpaces))) {
                this.nameSpace = nameSpace(nameSpaces)
            } else {
                return error('TypeError', `当'nameSpace'为函数时，返回值必须为字符串`)
            }
        } else {
            return error('TypeError', `配置参数'nameSpace'必须是一个字符串或函数`)
        }
    } else {
        this.nameSpace = null
    }
}
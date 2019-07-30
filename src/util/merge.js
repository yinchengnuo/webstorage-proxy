import { 
    ret0,  //初始化时没有配置钩子函数时返回的钩子函数列表
    ret1,  //初始化时配置钩子函数时返回的钩子函数列表
    isString,  //类型判断：string
    isObject,  //类型判断：object
    isFunction, //类型判断：function
    nameSpaceCheck,  //检测命名空间类型，如果为字符串就直接赋值,如果为函数就执行，并把所有已经存在的命名空间名称放在数组作为参数传入
    defaultLifeCircle,  //初始化时没有配置任何钩子函数时的默认操作
    proxyLifeCircleList,  //代理钩子列表使得只能添加不能删除钩子函数
} from './util'

export default function(arg) {  //合并配置项
    if (arg.length == 1) {  //当只有一个参数时
        if (isString(arg[0])) {  //当参数为唯一的字符串时
            this._TYPE = arg[0]
            this._NAMESPACE = null
            defaultLifeCircle(this)
        } else if (isObject(arg[0])) {  //当参数为唯一的对象时
            this._TYPE = arg[0].type
            nameSpaceCheck(this, arg[0].nameSpace)
            this.beforeCreate = isFunction(arg[0].beforeCreate) ?  arg[0].beforeCreate : function() {}
            this.created = isFunction(arg[0].created) ?  arg[0].created : function() {}
            this.beforeGet = isFunction(arg[0].beforeGet) ?  proxyLifeCircleList(ret1(arg[0].beforeGet)) : proxyLifeCircleList(ret0())
            this.geted = isFunction(arg[0].geted) ?  proxyLifeCircleList(ret1(arg[0].geted)) : proxyLifeCircleList(ret0())
            this.beforeSet = isFunction(arg[0].beforeSet) ?  proxyLifeCircleList(ret1(arg[0].beforeSet)) : proxyLifeCircleList(ret0())
            this.proxySeted = isFunction(arg[0].proxySeted) ?  proxyLifeCircleList(ret1(arg[0].proxySeted)) : proxyLifeCircleList(ret0())
            this.storageSeted = isFunction(arg[0].storageSeted) ?  proxyLifeCircleList(ret1(arg[0].storageSeted)) : proxyLifeCircleList(ret0())
            this.beforeDel = isFunction(arg[0].beforeDel) ?  proxyLifeCircleList(ret1(arg[0].beforeDel)) : proxyLifeCircleList(ret0())
            this.proxyDeled = isFunction(arg[0].proxyDeled) ?  proxyLifeCircleList(ret1(arg[0].proxyDeled)) : proxyLifeCircleList(ret0())
            this.storageDeled = isFunction(arg[0].storageDeled) ?  proxyLifeCircleList(ret1(arg[0].storageDeled)) : proxyLifeCircleList(ret0())
            this.storageChanged = isFunction(arg[0].storageChanged) ?  proxyLifeCircleList(ret1(arg[0].storageChanged)) : proxyLifeCircleList(ret0())
            this.beforeDestroy = isFunction(arg[0].beforeDestroy) ?  arg[0].beforeDestroy : function() {}
            this.destroyed = isFunction(arg[0].destroyed) ?  arg[0].destroyed : function() {}
        }
    } else {  //当参数大于一时
        this._TYPE = arg[0]
        nameSpaceCheck(this, arg[2])
        defaultLifeCircle(this)
    }
}
import reWrite from './reWrite'
import SuperProxy from '../super/SuperProxy'
import nameSpaceCheck from '../util/nameSpaceCheck'
import lifeCircleCheck from '../util/lifeCircleCheck'

//当type 为 sessionStorage/localStorage 时的处理
export default class StorageProxy extends SuperProxy {
    constructor (option) {
        super(option)  //将配置对象传递给父类
        this.key = '_WEBSTORAGEPROXY_NEWED_KEY'
        window[option.type].getItem(this.key)
        this.flag = '_WEBSTORAGEPROXY'  //WebStorageProxy对象控制的数据的私有前缀
        this.nameSpaceFlag = '_WEBSTORAGEPROXY_NAMESPACE'  //WebStorageProxy对象控制的具有命名空间的数据的私有前缀
        this.type = option.type  //定义当前对象的类型
        nameSpaceCheck.call(this, option.nameSpace)  //定义当前对象的命名空间
        this.state = Object.create(this)  //定义当前对象的状态
        lifeCircleCheck.call(window, option.boforedCreate)  //挂载beforeCreate钩子函数
        Promise.resolve().then(() => {  //挂载created钩子函数
            lifeCircleCheck.call(this, option.created)
        })
        reWrite.call(this)  //重写Storage原型链上的方法实现通过WebStorageProxy对象生成的的数据的私有化
        return this.state.proxy()  //返回经过代理的状态对象
    }
}
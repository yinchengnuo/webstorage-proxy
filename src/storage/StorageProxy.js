
export default class StorageProxy {
    constructor (...arg) {
        console.log(arg)
        this.state = Object.create(this)
        this.type = arg[0]
    }
}
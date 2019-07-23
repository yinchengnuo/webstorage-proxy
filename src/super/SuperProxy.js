import proxy from './proxy'

export default class SuperProxy {
    constructor (option) {
        this.option = option
    }
    proxy () {
        return proxy.call(this)
    }
} 
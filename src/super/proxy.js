// import isArray from 'lodash/isArray'
// import isObject from 'lodash/isObject'

export default function () {
    const StorageProxy = this
    // const proxy = state => {
    //     const proxyed = 
    // }
    if (StorageProxy.nameSpace) {
        return new Proxy(this, {
            set () {
                if (Super.nameSpace) {
                    console.log(Super.nameSpace)
                } else {
                    console.log('set')
                }
            },
            get (...arg) {
                if (Super.nameSpace) {
                    const space = window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`) ? JSON.parse(window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`)) : {}
                    console.log(space)
                    return space[arg[1]]
                } else {
                    console.log('set')
                }
            }
        })
    }
    // return new Proxy(this, {
    //     set () {
    //         if (Super.nameSpace) {
    //             console.log(Super.nameSpace)
    //         } else {
    //             console.log('set')
    //         }
    //     },
    //     get (...arg) {
    //         if (Super.nameSpace) {
    //             const space = window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`) ? JSON.parse(window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`)) : {}
    //             console.log(space)
    //             return space[arg[1]]
    //         } else {
    //             console.log('set')
    //         }
    //     }
    // })
}
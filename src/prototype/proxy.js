
export default function () {
    if (this.nameSpace) {
        return new Proxy(this, {
            // set () {
            //     if (Super.nameSpace) {
            //         console.log(Super.nameSpace)
            //     } else {
            //         console.log('set')
            //     }
            // },
            // get (...arg) {
            //     if (Super.nameSpace) {
            //         const space = window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`) ? JSON.parse(window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`)) : {}
            //         console.log(space)
            //         return space[arg[1]]
            //     } else {
            //         console.log('set')
            //     }
            // }
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
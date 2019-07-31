const encryption = str => {
    let string = escape(str)
    let len = string.length;
    let result = ''
    for (let i = 0; i < len; i ++) {
        result += String.fromCharCode(string.charCodeAt(i) + i + 23)
    }
    return result
}
const decryption = str => {
    let string = str
    let len = string.length;
    let result = ''
    for (let i = 0; i < len; i ++) {
        result += String.fromCharCode(string.charCodeAt(i) - i - 23)
    }
    return unescape(result)
}

localStorage.setItem('native1', JSON.stringify({ value: 'native1' }))
localStorage.setItem('native2', JSON.stringify({ value: 'native2' }));

sessionStorage.setItem('native1', 'value-native1');
sessionStorage.setItem('native2', 'value-native2');
sessionStorage.setItem('native3', 'value-native3');
sessionStorage.setItem('native4', 'value-native4');

sessionStorage.setItem('name', 'storage');
sessionStorage.setItem('age', 666);
sessionStorage.setItem('skills', JSON.stringify({
    web: {
        base: ['storage'],
        back: 'chrome',
        time: 2
    }
}));
sessionStorage.setItem('_WEBSTORAGEPROXY_NAMESPACE:YinChengNuo', encryption(JSON.stringify({
    name: 'yinchengnuo',
    age: 18,
    skills: {
        web: {
            base: ['html', 'css', 'js'],
            back: 'nodejs',
            time: 2
        },
        guitar: 'guitar'
    },
    sex: true
})));


    // let key = '0'
    // for (let i = 0; i < 1024 * 1024 * .5; i ++) {
    //     key += 0
    // }
    // sessionStorage.setItem(key, '')

// let str = ''
// for (let i = 0; i < 1024 * 100; i ++) {
//     str += 0
// }

// let value = ''
// let isFull = false
// do {
//     try {
//         let value = sessionStorage.getItem(key)
//         console.log(value.length / 1024 + 'KB', (value.length / 1024 / 1024).toFixed(2) + 'MB')
//         value += str
//         sessionStorage.setItem(key, value)
//     } catch (e) {
//         console.log(e)
//         isFull = !isFull
//     }
// } while (!isFull)


const option = {
    type: 'sessionStorage',
    // nameSpace: (nameSpaces) => {
    //     return nameSpaces[0]
    // },
    beforeCreate() {
        console.log('钩子函数：beforedCreate, this is : ', this) //OK
    },
    created() {
        console.log('钩子函数：created, this is : ', this) //OK
    },
    // beforeGet(targrt, key) {
    //     console.log('钩子函数：beforeGet, key is : ', key) //OK
    // },
    // geted(targrt, key) {
    //     console.log('钩子函数：geted, key is : ', key) //OK
    // },
    beforeSet() {
        console.log('钩子函数：beforeSet')
    },
    proxySeted() {
        console.log('钩子函数：proxySeted')
    },
    storageSeted() {
        console.log('钩子函数：storageSeted')
    },
    beforeDel() {
        console.log('钩子函数：beforeSet')
    },
    proxyDeled() {
        console.log('钩子函数：proxySeted')
    },
    storageDeled() {
        console.log('钩子函数：storageSeted')
    },
    storageChanged() {
        console.log('钩子函数：storageChanged')
    },
    // beforeBeyond() {
    //     console.log('钩子函数：beforeBeyond, this is : ', this)
    // },
    beforeDestroy() {
        console.log('钩子函数：beforeDestroy, this is : ', this)
    },
    destroyed() {
        console.log('钩子函数：destroyed, this is : ', this)
    },
}

WebStorageProxy.crypto(encryption, decryption)

const storage = new WebStorageProxy(option)
document.write("<pre>" + JSON.stringify(storage, null, 8) + "</pre>")

window.addEventListener('sessionstoragechange', e => {
    document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(storage, null, 8)
})
window.addEventListener('localstoragechange', e => {
    console.log(e)
})


// class Test {
//     constructor () {
//         this.name =  'Test'
//     }
// }

// Test.age = 18

// const TestProxy = new Proxy(Test, {
//     get (target, key) {
//         if (key === 'encryption') {
//             return fun => {
//                 target.prototype.encryption = fun
//             }
//         }
//         return Reflect.get(target, key)
//     }
// })

// console.log(TestProxy)


// function Test () {
//     Test.setItem = Symbol('setItem')
//     console.log(Test.setItem)
//     return Test.setItem    
// }
// Test.call(window)

// const s = new Proxy(Test, {
//     get (target, key) {
//         if (key === 'setItem') {
//             return false
//         }
//         return Reflect.get(target, key)
//     },
//     // apply () {

//     // }
// })

setTimeout(() => {
    console.log(23444)
    console.log(WebStorageProxy.prototype.decryption.call((new WebStorageProxy('sessionStorage')).__proto__, sessionStorage[WebStorageProxy.prototype._GETITEM]('_WEBSTORAGEPROXY_NAMESPACE:YinChengNuo')))
}, 3456)


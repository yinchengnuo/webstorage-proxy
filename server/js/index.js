localStorage.setItem('native1', 'native1');
localStorage.setItem('native2', 'native2');

sessionStorage.setItem('native1', 'value-native1');
sessionStorage.setItem('native2', 'value-native2');
sessionStorage.setItem('native3', 'value-native3');
sessionStorage.setItem('native4', 'value-native4');

sessionStorage.setItem('_WEBSTORAGEPROXY:name', 'storage');
sessionStorage.setItem('_WEBSTORAGEPROXY:age', 9999999);
sessionStorage.setItem('_WEBSTORAGEPROXY:skills', JSON.stringify({
    web: {
        base: ['storage'],
        back: 'chrome',
        time: 2
    }
}));
sessionStorage.setItem('_WEBSTORAGEPROXY_NAMESPACE:YinChengNuo', JSON.stringify({
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
}));

window.addEventListener('storage', e => {
    console.log(e)
})
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
    maxSpace: 4,
    // nameSpace: (nameSpaces) => {
    //     // return nameSpaces[0]
    //     return 'YinChengNuo'
    // },
    beforeCreate() {
        console.log('钩子函数：beforedCreate, this is : ', this)  //OK
    },
    created() {
        console.log('钩子函数：created, this is : ', this)  //OK
    },
    beforeGet() {
        console.log('钩子函数：beforeGet, this is : ', this)  //OK
    },
    geted() {
        console.log('钩子函数：geted, this is : ', this)  //OK
    },
    beforeSet() {
        console.log('钩子函数：beforeSet, this is : ', this)  //OK
    },
    proxySeted() {
        console.log('钩子函数：proxySeted, this is : ', this)  //OK
    },
    storageSeted() {
        console.log('钩子函数：storageSeted, this is : ', this)
    },
    beforeDestroy() {
        console.log('钩子函数：beforeDestroy, this is : ', this)
    },
    destroyed() {
        console.log('钩子函数：destroyed, this is : ', this)
    },
    beforeBeyond() {
        console.log('钩子函数：beforeBeyond, this is : ', this)
    },
    encryption() {

    },
    decryption() {

    }
}
const storage = new WebStorageProxy(option)
document.write("<pre>" + JSON.stringify(storage, null, 8) + "</pre>")
console.log(storage, 'WebStorageProxy对象')
// localStorage.setItem('native1', 'native1');
// localStorage.setItem('native2', 'native2');

// sessionStorage.setItem('native1', 'native1');
// sessionStorage.setItem('native2', 'native2');
// sessionStorage.setItem('native3', 'native3');
// sessionStorage.setItem('native4', 'native4');

// sessionStorage.setItem('_WEBSTORAGEPROXY:name', 'storage');
// sessionStorage.setItem('_WEBSTORAGEPROXY:age', 9999999);
// sessionStorage.setItem('_WEBSTORAGEPROXY:skills', JSON.stringify({
//     web: {
//         base: ['storage'],
//         back: 'chrome',
//         time: 2
//     }
// }));
// sessionStorage.setItem('_WEBSTORAGEPROXY_NAMESPACE:YinChengNuo', JSON.stringify({
//     name: 'yinchengnuo',
//     age: 18,
//     skills: {
//         web: {
//             base: ['html', 'css', 'js'],
//             back: 'nodejs',
//             time: 2
//         },
//         guitar: 'guitar'
//     },
//     sex: true
// }));
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
    nameSpace: (nameSpaces) => {
        // return nameSpaces[0]
        return 'YinChengNuo'
    },
    boforedCreate () {
        console.log('boforedCreate, this is : ', this)
    },
    created () {
        console.log('created, this is : ', this)
    },
    beforeGet () {
        console.log('beforeGet, this is : ', this)
    },
    geted () {
        console.log('geted, this is : ', this)
    },
    beforeSet () {
        console.log('beforeSet, this is : ', this)
    },
    proxySeted () {
        console.log('proxySeted, this is : ', this)
    },
    storageSeted () {
        console.log('storageSeted, this is : ', this)
    },
    beforeDestroy () {
        console.log('beforeDestroy, this is : ', this)
    },
    destroyed () {
        console.log('destroyed, this is : ', this)
    },
    beforeBeyond () {
        console.log('beforeBeyond, this is : ', this)
    },
    encryption () {

    },
    decryption () {

    }
}
const storage = new WebStorageProxy(option)

console.log(storage, '=============================================WebStorageProxy对象')
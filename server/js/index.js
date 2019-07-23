localStorage.setItem('native1', 'native1');
localStorage.setItem('native2', 'native2');

sessionStorage.setItem('native1', 'native1');
sessionStorage.setItem('native2', 'native2');
sessionStorage.setItem('native3', 'native3');
sessionStorage.setItem('native4', 'native4');

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

const storage = new WebStorageProxy({
    type: 'sessionStorage', 
    capacity: 4, 
    nameSpace: (nameSpaces) => {
        return nameSpaces[0]
    },
    boforedCreate () {
        console.log('boforedCreate, this is : ', this)
    },
    created () {
        console.log('created')
    },
    beforeGet () {
        console.log('beforeGet')
    },
    geted () {
        console.log('geted')
    },
    beforeSet () {
        console.log('beforeSet')
    },
    proxySeted () {
        console.log('proxySeted')
    },
    storageSeted () {
        console.log('storageSeted')
    },
    beforeDestroy () {
        console.log('beforeDestroy')
    },
    destroyed () {
        console.log('destroyed')
    }
})

console.log(storage)
const storage = new WebStorageProxy('sessionStorage', 4, 'yinchengnuo', e => {
    console.log('storage changed')
})

console.log(storage)
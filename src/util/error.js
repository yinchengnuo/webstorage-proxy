export default function (type, msg) {
    try {
        switch (type) {
            case 'TypeError': {
                throw new TypeError(msg)
            }
            case 'ReferenceError': {
                throw new ReferenceError(msg)
            }
            case 'RangeError': {
                throw new RangeError(msg)
            }
            default: {
                throw new Error(msg)
            }
        }
    } catch (e) {
        console.error(e)
        return e
    }
}
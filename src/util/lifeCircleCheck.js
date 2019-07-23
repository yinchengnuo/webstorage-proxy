import isFunction from 'lodash/isFunction'
// import error from './error'

export default function (handdle) {
    if (isFunction(handdle)) {
        try {
            handdle.call()
        } catch (e) {
            console.log(e)
            // error('')
        }
    }
}
import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'

const production = process.env.NODE_ENV === 'production'
const FormatName = {
    format: 'umd', 
    name: 'WebStorageProxy'
}
const output = [{
    file: 'server/js/webstorage-proxy.js', 
    ...FormatName
}]

if (production) {
    output[0] = {
        file: 'dist/webstorage-proxy.js', 
        ...FormatName
    }
    output[1] = {
        file: 'dist/webstorage-proxy.min.js', 
        ...FormatName
    }
}

export default {
    input: 'src/WebStorageProxy',
    output,
    plugins: [
        commonjs(),
        resolve(),
        babel({
          exclude: 'node_modules/**'
        }),
        eslint({
            throwOnError: false,
            throwOnWarning: true,
            include: ['src/**'],
            exclude: ['node_modules/**']
        }),
        production && uglify(),
        !production && serve({
            open: true,
            contentBase: 'server/',
            port: 80,
        }),
        !production && livereload({
            watch: 'server/'
        })
    ],
}
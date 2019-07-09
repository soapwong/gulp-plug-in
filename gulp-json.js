const { Transform } = require('stream')
const path = require('path')
const jsonToCSS = require('./json_to_css')

const log = console.log.bind(console)

const gulpJson = () => {
    let t = new Transform({
        objectMode: true,
        transform: (...args) => {
            // log('args', args)
            let [file, encoding, callback] = args
            log('keys', 'contents' in file)

            // 先读取内容
            let content = file.contents.toString('utf8')

            content = jsonToCSS(content)
            file.contents = Buffer.from(content)
            file.path = 'soap.css'
            file.base = path.resolve(file.base, '..')
            let error = null
            // node.js 第一个参数是 error
            return callback(error, file)
        }
    })
    return t
}

module.exports = gulpJson


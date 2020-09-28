var path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'avenue.js',
        path: path.resolve(__dirname, 'js')
    }
}
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
        // main2: './src/app2.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    }
}
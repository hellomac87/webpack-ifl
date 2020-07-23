const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js',
        // main2: './src/app2.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        // loader : 각 파일에 실행됨
        rules: [
            {
                test: /\.css$/, // parttern
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000, //20kb
                },
            }
        ]
    },
    plugins: [ // 번들된 결과물에 후처리
        new MyWebpackPlugin(),
    ]
}
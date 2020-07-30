const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                    process.env.NODE_ENV === 'production' ?
                        MiniCssExtractPlugin.loader :
                        'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000, //20kb
                },
            }
        ]
    },
    plugins: [ // 번들된 결과물에 후처리
        new webpack.BannerPlugin({
            banner: `
                Bulid Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Auhtor: ${childProcess.execSync('git config user.name')}

            `
        }),
        new webpack.DefinePlugin({
            TWO: JSON.stringify('1+1'),
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === "development" ? '(개발용)' : ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,
                removeComments: true
            } : false
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === 'production' ?
            [new MiniCssExtractPlugin({ filename: '[name].css' })] : [])
    ]
}
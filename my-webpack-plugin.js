class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('MyWebpackPlugin', stats => {
        //     console.log('MyWebpackPlugin: done');
        // })

        compiler.plugin('emit', (compliation, callback) => {
            const source = compliation.assets['main.js'].source();
            // console.log(source);
            compliation.assets['main.js'].source = () => {
                const banner = [
                    '/**',
                    '* 이것은 BannerPlugin이 처리한 결과입니다.',
                    '* BuildDate: 2019-10-10',
                    '*/'
                ].join('\n');
                return banner + '\n\n' + source;
            }

            callback();
        })
    }
}

module.exports = MyWebpackPlugin;
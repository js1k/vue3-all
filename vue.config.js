// vue.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    outputDir: 'dist', // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    // productionGzip: true,
    productionSourceMap: false, // 生产环境是否生成 SourceMap

    devServer: {
        open: true, // 启动服务后是否打开浏览器
        overlay: { // 错误信息展示到页面
            warnings: true,
            errors: true
        },
        host: '0.0.0.0',
        port: 8888, // 服务端口
        https: false,
        hotOnly: false
        // proxy: { // 设置代理
        //   '/api': {
        //     target: host,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '/api': '/',
        //     }
        //   },
        // },
    },
    chainWebpack: config => {
        // config.entity('main').add('babel-polyfill')
        config.module.rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
        // 开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }))
        }
    }
}

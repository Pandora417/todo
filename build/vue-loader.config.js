// const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev) => {
    return {
        preserveWhitepace: true, //去掉vue文件里 template模板中的空格
        extractCSS: !isDev, //vue文件里的css样式打包时 ，可打包到style.css里面去
        cssModules: {
            // localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            // camelCase: true //css类名里，横杠式类名变成驼峰式
        }
        // postcss
        // hotReload:false   //在production下关闭热重载,默认为false
        // loaders: {
        //     'docs': docsLoader
        // }
    }
}
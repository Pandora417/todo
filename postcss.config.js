const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer() //后处理css，会自动加上-webkit之类的前缀
    ]
}
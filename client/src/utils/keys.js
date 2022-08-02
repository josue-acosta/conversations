if (process.env.NODE_ENV === 'development') {
    // development credentials
    module.exports = require('./dev')
}
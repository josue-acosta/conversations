if (process.env.NODE_ENV === 'production') {
    // production credentials
    module.exports = require('./prod')
} else {
    // development credentials
    module.exports = require('./dev')
}
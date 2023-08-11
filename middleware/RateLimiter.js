const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    max:10,
    windowMS:1000 * 60,
    message:"You cant make any more request at the moment. Please try again Later."
})

module.exports = limiter;
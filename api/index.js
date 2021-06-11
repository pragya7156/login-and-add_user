const router = require('express').Router();
const users = require('./users');
const { IS_AUTHENTICATED } = require('../middlewares/authcheck')

router.use('/get_users', users);

router.get('/',(_,res)=>{
    res.status(200).json({
        message: "Welcome to user API"
    });
})

module.exports = router;
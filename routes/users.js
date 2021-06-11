const router = require('express').Router();
const {ADD_USER, DEL_USER} = require('../controller/users');
const { IS_AUTHENTICATED } = require('../middlewares/authcheck');

router.post('/adduser' ,ADD_USER);
router.post('/deluser', DEL_USER);

router.get('/',(_,res) => {
    res.status(200).json({
        message: "User Home Page"
    })
})

module.exports = router;
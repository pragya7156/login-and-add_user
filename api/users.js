const router = require('express').Router();
const pool = require('../config/db_config');

router.post('/', async (req,res) => {
    try {
        let sql = `SELECT * FROM users;`;
        const result = await pool.query(sql)
        res.status(200).json({
            message: "User List fetched successfully",
            status: 1,
            result
        })
    } catch (error) {
        return res.status(200).json({
            message: error.message,
            status: 0
        })
    }
})

module.exports = router;
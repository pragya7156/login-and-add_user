const pool = require('../config/db_config');

module.exports.ADD_USER = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !phone || !email || !address) {
            return res.status(200).json({
                message: "All fields are required",
                status: 0
            })
        }
        let sql = `INSERT INTO users (name, email, phone, address, created_at) VALUES (?,?,?,?,?);`;
        const result = await pool.query(sql, [name, email, phone, address, new Date()]);
        res.status(200).json({
            message: "User added successfully.",
            status: 1,
            result
        })
    } catch (error) {
        return res.status(200).json({
            message: error.message,
            status: 0
        })
    }
}

module.exports.DEL_USER = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(200).json({
                message: "Missing required field",
                status: 0
            })
        }
        let sql = `DELETE FROM users WHERE user_id=?;`;
        const result = await pool.query(sql, [user_id]);
        res.status(200).json({
            message: "User deleted",
            status: 1,
            result
        })
    } catch (error) {
        return res.status(200).json({
            message: error.message,
            status: 0
        })
    }
}
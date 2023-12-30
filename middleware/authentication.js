const jwt = require('jsonwebtoken')


const auth_user = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({
            code:400,
            success:false,
            message: "Invalid Authentication Token !."
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({
                code:400,
                success:false,
                message: "Invalid Authentication or Token Expired !."
            })

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({
            code:500,
            message: err.message
        })
    }
}

module.exports = auth_user
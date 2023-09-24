import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import jwt from 'jsonwebtoken'

export default(req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, process.env.R_TOKEN, (err, decoded) => {
            if (err)
                return res.status(401).json({success: false, msg: 'unAuthorized access!'})
            req.decoded = decoded
            next()
        })
    }else{
        return res.status(403).json({success: false, msg: 'No token!'})
    }
}
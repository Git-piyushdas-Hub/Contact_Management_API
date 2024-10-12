import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const validateToken = asyncHandler(async(req,res,next)=> {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')) {
        let token = authHeader.split(' ')[1]

        if(!token) {
            res.status(401)
            throw new Error('token missing!')
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err) {
                res.status(401)
                throw new Error('User is not authorized!')
            }
            console.log(decoded);
            req.user = decoded.user_payload
            next()
        })
    }

})

export default validateToken
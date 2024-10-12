import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// @desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable) {
        res.status(400)
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const user = await User.create({
        username,
        email, 
        password: hashedPassword
    })

    console.log(`User created ${user}`);
    
    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400)
        throw new Error('User data is not valid')
    }
})

// @desc Login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    
    if(!email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }

    const user = await User.findOne({email})
    if(user && bcrypt.compare(password, user.password)) {
        const accessToken = await jwt.sign(
            {
                user_payload: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        )
        res.status(200).json({accessToken})
    } 
    else {
        res.status(401)
        throw new Error('email or password is incorrect')
    }
})

// @desc Get current user
// @route GET /api/users/current
// @access private

const getCurrentUser = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})

export {registerUser, loginUser, getCurrentUser}
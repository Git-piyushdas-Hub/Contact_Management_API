import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Please add a name for the user']
    }, 
    email: {
        type: String,
        required: [true, 'Please add an email for the user'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the password for the user']
    }
},
    {
        timestamps: true
    } 
)

const User = mongoose.model('user', userSchema)

export default User
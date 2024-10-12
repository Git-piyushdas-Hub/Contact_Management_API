import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: [true,'Please add the contact name']
    },
    email: {
        type: String,
        required: [true, 'Please add the contact email']
    },
    phone: {
        type: String,
        required: [true, 'Please add the contact phone'],
        unique: true
    }
}, 
    {
        timestamps: true
    }
)

const Contact = mongoose.model('contact', contactSchema)

export default Contact

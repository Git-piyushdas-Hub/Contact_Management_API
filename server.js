import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middlewares/errorsHandler.js'
import mongoose from 'mongoose'

const app = express()

// parse the stream of the data received from the client by the server
app.use(express.json())

// Establishing connection
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected', connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1) 
    } 
}

// Connect Database
connectDB()




app.use('/api/contacts', contactRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)






const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running and listening to requests on port ${PORT}`);  
})
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import roleRoute from './routes/Role.js'
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js'

dotenv.config()
const app=express();

app.use(express.json());
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


//error Handler Middleware
app.use((obj, req, res, next) => {

    const statusCode=obj.status || 500;
    const message=obj.message || "Something went worng!";
   return  res.status(statusCode).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message:message,
    stack:obj.stack,
    data:obj.data
   })

});

// app.use((err, req, res, next) => {

//     const statusCode=err.status || 500;
//     const errorMessage=err.message || "Something went worng!";
//    return  res.status(statusCode).json({
//     success: false,
//     status: statusCode,
//     message:errorMessage,
//     stack:err.stack
//    })

// });

const DBConnection=async() => {
    try{
        await mongoose.connect(process.env.MANGODBURL)
       
        console.log("DataBase is connected!")
    }
    catch(error){
        throw error;
    }
}





app.listen(8000, () =>{
    DBConnection()
    console.log("Server is ready!")
})
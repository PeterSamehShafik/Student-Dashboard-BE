import morgan from 'morgan'
import express from 'express'
import cors from 'cors'

// import { connectDB } from '../../DB/connection.js'
import { globalErrorHandling } from '../middleware/asyncHandler.js'
import { connectDatabase } from '../DB/connection.js'
import userRouter from './user/user.router.js';
import userModel from '../DB/models/user.model.js'




export const appRouter = (app) => {
    app.use(express.json({}));
    app.use(express.urlencoded({ extended: true }))    
    app.use(cors({}));

    //Returns request endpoint and time taken to execute it
    if (process.env.MODE === 'DEV') {
        app.use(morgan("dev"))
    } else {
        app.use(morgan("combined"))
    }

    //Base URL
    const baseURL = '/api'

    //Api Setup
    app.use(`${baseURL}/user`, userRouter);

    //insert dummy data
    // app.get(`/dummy`, async (req, res, next) => {
    //     const d = await userModel.insertMany([
    //         {
    //             "firstName": "James",
    //             "lastName": "Johnson",
    //             "email": "james.johnson@gmail.com",
    //             "phone": "1234567890"
    //         },
    //         {
    //             "firstName": "Ahmed",
    //             "lastName": "Ali",
    //             "email": "ahmed.ali@yahoo.com",
    //             "phone": "01001234567"
    //         },
    //         {
    //             "firstName": "Maria",
    //             "lastName": "Garcia",
    //             "email": "maria.garcia@hotmail.com",
    //             "phone": "2345678901"
    //         },
    //         {
    //             "firstName": "Sarah",
    //             "lastName": "Hassan",
    //             "email": "sarah.hassan@gmail.com",
    //             "phone": "01234567890"
    //         },
    //         {
    //             "firstName": "Robert",
    //             "lastName": "Martinez",
    //             "email": "robert.martinez@gmail.com",
    //             "phone": "3456789012"
    //         },
    //         {
    //             "firstName": "Michael",
    //             "lastName": "Smith",
    //             "email": "michael.smith@yahoo.com",
    //             "phone": "01122334455"
    //         },
    //         {
    //             "firstName": "Emily",
    //             "lastName": "Davis",
    //             "email": "emily.davis@hotmail.com",
    //             "phone": "4567890123"
    //         },
    //         {
    //             "firstName": "Linda",
    //             "lastName": "Brown",
    //             "email": "linda.brown@gmail.com",
    //             "phone": "01233445566"
    //         },
    //         {
    //             "firstName": "Omar",
    //             "lastName": "Mohamed",
    //             "email": "omar.mohamed@yahoo.com",
    //             "phone": "01099887766"
    //         },
    //         {
    //             "firstName": "John",
    //             "lastName": "Doe",
    //             "email": "john.doe@hotmail.com",
    //             "phone": "6789012345"
    //         },
    //         {
    //             "firstName": "Hannah",
    //             "lastName": "Johnson",
    //             "email": "hannah.johnson@gmail.com",
    //             "phone": "7890123456"
    //         },
    //         {
    //             "firstName": "Youssef",
    //             "lastName": "Ibrahim",
    //             "email": "youssef.ibrahim@yahoo.com",
    //             "phone": "01555667788"
    //         },
    //         {
    //             "firstName": "Elizabeth",
    //             "lastName": "Hernandez",
    //             "email": "elizabeth.hernandez@hotmail.com",
    //             "phone": "8901234567"
    //         },
    //         {
    //             "firstName": "David",
    //             "lastName": "Moore",
    //             "email": "david.moore@gmail.com",
    //             "phone": "9012345678"
    //         },
    //         {
    //             "firstName": "Susan",
    //             "lastName": "Martin",
    //             "email": "susan.martin@yahoo.com",
    //             "phone": "1234567801"
    //         },
    //         {
    //             "firstName": "Karim",
    //             "lastName": "Ahmed",
    //             "email": "karim.ahmed@hotmail.com",
    //             "phone": "01077889900"
    //         },
    //         {
    //             "firstName": "Barbara",
    //             "lastName": "Anderson",
    //             "email": "barbara.anderson@gmail.com",
    //             "phone": "5678901234"
    //         },
    //         {
    //             "firstName": "William",
    //             "lastName": "Thomas",
    //             "email": "william.thomas@yahoo.com",
    //             "phone": "7890123456"
    //         },
    //         {
    //             "firstName": "Emily",
    //             "lastName": "Davis",
    //             "email": "emily.davis@gmail.com",
    //             "phone": "01566778899"
    //         },
    //         {
    //             "firstName": "Mohamed",
    //             "lastName": "Hussein",
    //             "email": "mohamed.hussein@hotmail.com",
    //             "phone": "01033445566"
    //         },
    //         {
    //             "firstName": "Ali",
    //             "lastName": "Youssef",
    //             "email": "ali.youssef@gmail.com",
    //             "phone": "01244556677"
    //         },
    //         {
    //             "firstName": "Linda",
    //             "lastName": "Williams",
    //             "email": "linda.williams@yahoo.com",
    //             "phone": "8901234567"
    //         },
    //         {
    //             "firstName": "Ahmed",
    //             "lastName": "Mahmoud",
    //             "email": "ahmed.mahmoud@gmail.com",
    //             "phone": "01155667788"
    //         },
    //         {
    //             "firstName": "Nora",
    //             "lastName": "Adams",
    //             "email": "nora.adams@hotmail.com",
    //             "phone": "2345678901"
    //         },
    //         {
    //             "firstName": "Michael",
    //             "lastName": "Robinson",
    //             "email": "michael.robinson@gmail.com",
    //             "phone": "3456789012"
    //         },
    //         {
    //             "firstName": "Sophia",
    //             "lastName": "Martinez",
    //             "email": "sophia.martinez@yahoo.com",
    //             "phone": "4567890123"
    //         },
    //         {
    //             "firstName": "Omar",
    //             "lastName": "Ali",
    //             "email": "omar.ali@hotmail.com",
    //             "phone": "01099887766"
    //         },
    //         {
    //             "firstName": "Hussein",
    //             "lastName": "Khaled",
    //             "email": "hussein.khaled@gmail.com",
    //             "phone": "01122334455"
    //         },
    //         {
    //             "firstName": "Layla",
    //             "lastName": "Ahmed",
    //             "email": "layla.ahmed@yahoo.com",
    //             "phone": "01566778899"
    //         },
    //         {
    //             "firstName": "Adam",
    //             "lastName": "Smith",
    //             "email": "adam.smith@gmail.com",
    //             "phone": "6789012345"
    //         }
    //     ]
    //     )
    //     res.status(200).send(d)
    // });

    //Invalid routing
    app.use('*', (req, res, next) => {

        app.use(morgan("dev"))

        //res.status(404).json({ message: "Invalid Routing" })
        return next(Error("404 Page not found In-valid Routing or method", { cause: 404 }))
    })

    //Error handling  
    app.use(globalErrorHandling);

    //Connection on DB
    connectDatabase();
}

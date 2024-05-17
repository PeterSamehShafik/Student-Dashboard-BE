import { Schema, model, Types } from 'mongoose'


const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "firstName is required"],
        min: [2, "Length of firstName must be more than 2"],
        max: [10, "Length of firstName must be more than 10"]
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"],
        min: [2, "Length of lastName must be more than 2"],
        max: [10, "Length of lastName must be more than 10"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        min: [5, "Length of email must be more than 5"],
        max: [50, "Length of email must be more than 50"],
        unique: [true, 'email must be unique']
    },
    profilePic: {
        secure_url: String,
        public_id: String
    },
    phone: String
}, {
    timestamps: true
})


const userModel = model('User', userSchema)

export default userModel
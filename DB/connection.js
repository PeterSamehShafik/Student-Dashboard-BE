import mongoose from "mongoose";

export const connectDatabase = async () => {
    return await mongoose.connect(process.env.DBURI)
        .then(res => { console.log("DB is Connected Successfully......"); })
        .catch(err => console.log(`Fail to connect to DB....${err}`))
}
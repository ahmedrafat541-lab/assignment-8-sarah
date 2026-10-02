import mongoose from "mongoose";


export default async function connectionDB(){
    await  mongoose.connect("mongodb://127.0.0.1:27017/sarah-app-awel-mara")
    .then(()=>{console.log("DB connected successfully")})
    .catch((error)=>{console.log(error , "DB connecting failed")})
}    
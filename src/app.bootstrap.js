
import express from "express";
import connectionDB from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import cors from "cors" ;
const app = express();
const port =3010;



const bootstrap = async()=>{
    app.use(cors())
    app.use(express.json());
    app.get("/" , (req , res  )=>{
res.status(200).json({message:"hello nigga"})});


await connectionDB();

app.use("/users",userRouter)




app.use("{/*demo}" , (req , res ,next)=>{
    throw new Error( `url:${req.originalUrl} with method:${req.method} not found` , {cause:404})  });


    app.use(( err , req , res  , next)=>{
        console.log(err);
        res.status(err.cause || 500).json({message:err.message , stack:err.stack })
    });
 


    app.listen(port , ()=>{console.log(`example app.listening on port ${port}!`)})

};


export default bootstrap

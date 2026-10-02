import userModel from "../../DB/models/user.model.js";
import * as dbservice from "../../DB/DB.service.js"
import { Decrypt, Encrypt } from "../../common/security/encrypt.js";
import {hashSync , compareSync} from "bcrypt";
import { Hash  , Compare } from "../../common/security/hash.js";
import jwt from "jsonwebtoken"; 
  import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client();



export const signUp = async (req , res , next)=>{

    const {fName , lName , email , password , age , gender , phone }=req.body;

   
    // const user = await userModel.create([{fName , lName , email , password , age , gender }])
    //await dbservice.findOne({ model:userModel , filter: {email:email.toLowerCase()}})
    
    const user = await dbservice.create({model:userModel , data: {fName , lName , email , password:await Hash(password) , age , gender , phone:Encrypt(phone)  }});

   return res.status(201).json({message:"done" , user})
}






export const signUpWithGmail = async (req , res , next)=>{

    const {idToken}=req.body;

    console.log({idToken})

  const decoded = await client.verifyIdToken({
      idToken ,
      audience: "199384594082-p76fjog67gmiiqv6ckotkcoor1mfrq1t.apps.googleusercontent.com",
  });
  const {family_name , given_name , picture , email_verified,email } = decoded.getPayload();

  let user =await dbservice.findOne({ model:userModel , filter: {email:email.toLowerCase()}})
  
 if(!user){
    await dbservice.create({model:userModel , data: {fName:given_name , lName:family_name , profileImage:picture  , inConfirmed:email_verified  ,  email , provider:"google"    }});
 };

 if(user.provider == "system"){return res.status(400).json({message:"login with system only"})};




     const access_token = jwt.sign({id:user._id , email:user.email} , "ahmedmeshahmed" , {expiresIn:100});
         const refresh_token = jwt.sign({id:user._id , email:user.email} , "ahmedmeshahmed gg" );

   return res.status(201).json({message:"done"  , tokens:{access_token , refresh_token} });

  
    
}






export const signIn = async (req , res , next)=>{
    const { email , password }=req.body;
    // const user = await userModel.findOne({email:email.toLowerCase()})
    const user = await dbservice.findOne({ model:userModel , filter: {email:email.toLowerCase()} , provider:"system" });
    if(!user){ throw new Error("email not exist" , {cause:400})};




    if( !await Compare(  password ,  user.password)){
         throw new Error("ivalid password")};




         const access_token = jwt.sign({id:user._id , email:user.email} , "ahmedmeshahmed" , {expiresIn:100});
         const refresh_token = jwt.sign({id:user._id , email:user.email} , "ahmedmeshahmed gg" );

   return res.status(201).json({message:"done"  , tokens:{access_token , refresh_token} })


};






export const getProfile = async (req  ,res , next)=>{
    const {token} = req.body ;
    if(!token){ throw new Error("token not exist" , {cause:400}) } 

    const decoded = jwt.verify(token , "ahmedmeshahmed") ; 

    const user  =await dbservice.findOne({
        model:userModel , filter:{email:decoded.email.toLowerCase()}
    })

    if(!user){throw new Error ("email not exist" , {cause:404})}


    return res.status(200).json({message:"done" , decoded})




}



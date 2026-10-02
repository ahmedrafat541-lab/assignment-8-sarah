import mongoose from "mongoose";


const userSchema = new mongoose.Schema({ 

fName:{ 
    type:String,
    required:true,
    trim:true,
    min:2,
    
},
lName:{ 
    type:String,
    required:true,
    trim:true,
    min:2,
   
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowerCase:true
},
password:{
    type:String,
    required: function(){
       return this.provider =="system"? true:false
    },
    trim:true,
},
age:{
    type:Number,
    required:function(){
       return this.provider =="system"? true:false
    },
    min:19,
    max:70
},
gender:{
    type:String,
    enum:["male","female"],
    default:"male"
},

profileImage:{type:String},

phone: String ,

provider:{
    type:String,
enum:["system","google"],
default:"system"
},

inConfirmed:{
    type:Boolean,
default:false
}


},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


const userModel = mongoose.models.User || mongoose.model("User" , userSchema);


export default userModel 



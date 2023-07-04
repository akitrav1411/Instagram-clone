const mongoose=require('mongoose')
const{ObjectId}=mongoose.Schema.Types
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requires:true
    },
    password:{
        type:String,
        requires:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
type:String,
default:"https://res.cloudinary.com/da2qyc62n/image/upload/v1675917766/WhatsApp_Image_2023-02-09_at_10.11.15_AM_rhdyuk.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
    
})
mongoose.model("User",UserSchema)

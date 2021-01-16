const mongoose= require('mongoose');

const usersSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    surname:{type:String,required:true},
    fin:{type:String,required:true,unique:true},
    aze:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    time:{type:Date,default:Date.now},
    person_id:{type:String,default:Date.now()},
    authority:{type:String,default:"false"}
})
module.exports =mongoose.model('User',usersSchema);
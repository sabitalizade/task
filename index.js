const express = require("express"),
app = express(),
bodyparser = require("body-parser"),
path = require("path"),
mongoose = require("mongoose"),
User = require("./model/User")

const {LocalStorage} = require('node-localstorage') 
localStorage = new LocalStorage('./scratch')

mongoose.connect('mongodb+srv://autonuh:Pghw6Fbz4JPHthhN@autonuh.kxvmz.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).catch(err=>{console.log(err);})

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// const data ={ad:"sabit",soyad:"alizade"}
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/passchange",(req,res)=>{
    res.render("info")
})
app.get("/passform",(req,res)=>{
    const localdata=JSON.parse(localStorage.getItem("user"))
    res.render("change",localdata)
})

app.get("/admin",(req,res)=>{
    User.find({authority:"true"}).then(data=>{
        res.render("admin",{data:data})
    })
})

app.post("/registr",(req,res)=>{    
    // console.log(req.body);
    User.create(req.body)
    res.redirect("/admin")
})

app.post("/changepass",(req,res)=>{
    const data=req.body
    console.log(data);
    User.findOneAndUpdate({email:data.email},{password:data.newpass},{new:true},(err,doc)=>{
        if(err){
            console.log("wrong")
        } else {
            console.log(doc)
            res.redirect("/passchange")
        }
    })
})

app.post('/finduser',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        if (user) {
                if (user.password==password) {                               
                    // req.session.userId=user._id;
                    localStorage.setItem("user",JSON.stringify(user))
                                                   
                    res.redirect('/passform');
                }else{
                    res.redirect('/');
                }
        }else{
            res.redirect('/');
        }
    });
}); 

const port = process.env.PORT || 5000

app.listen(port,()=>{console.log(`App Listining http://localhost:${5000}`)})
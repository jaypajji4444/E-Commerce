const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Item = require("./model/db")
const User = require("./model/user")
const fileUpload = require('express-fileupload');

//  config
const configURI = require("./config/key").URI

// connection
const connect = async () => {
    await mongoose.connect(configURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB success!!")
}
connect().catch(err => console.log(err));




// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());

// ############# Routes ######################################

// @route: Get /
// desc:all items
app.get("/items", (req, res) => {
    Item.find({}).then(data => res.json(data)).catch(err => res.status(201).json("success:false"))
})

// @route :post /signup
// desc: user signup
app.post("/signup", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(201).json({ msg: "Email and Password required" })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.json({ success: false, msg: "User already exists" })
                //res.status(400).json({msg:"User already Exits"})
            }
        })
    const newUser = new User({
        email: email,
        password: password
    })
    // Encryption
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash
            newUser.save()
                .then(user => {
                    jwt.sign({ id: user._id, email: user.email }, "secret", { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                email: user.email,
                            }
                        })
                    })
                })
                .catch(err => res.status(401).json(err))
        })
    })
})

// @route: post /login
// desc: user login
app.post("/login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(404).json({ success: false, msg: "Email and Password both required!!" })
    }
    // validation
    User.findOne({ email })
        .exec()
        .then(user => {
            if (!user) return res.status(202).json({ success: false, msg: "User does not exists" })
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(401).json({ success: false, msg: "Password do not match" })
                    jwt.sign({ id: user._id, email }, "secret", { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token,
                            user: {
                                id: user._id,
                                email: user.email
                            }
                        })
                    })
                })
        })
        .catch(err => res.status(401).json(err))

})

// @route:post
// Endpoint: /upload
// #desc: Add new Item
app.post('/upload', (req, res) => {
    const newItemData = JSON.parse(req.body.data)
    newItemData.price = parseInt(newItemData.price)
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    file.mv(`${__dirname}/my-app/public/images/${file.name}`, err => {
        if (err) {
        
            return res.status(500).send(err);
        }
        Item.insertMany(newItemData).then(data => {
            res.json({ fileName: file.name, filePath: `/uploads/${file.name}`, data: data });
        }).catch(err => res.status(201).json(err))
    });
});


// Endpopint: /items/:id
// @route: Delete
// @desc: Remove the item
app.delete("/items/:id",(req,res)=>{
    const id=req.params.id
    Item.deleteOne({_id:id}).then(data=>{
        res.status(200).json({success:true,data:data})
    })
    .catch(err=>res.status(401).json({success:false,msg:err}))
})

// Server Runnnig 
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Server Running Successfully On Port:", PORT)
})
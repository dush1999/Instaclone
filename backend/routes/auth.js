const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middelwares/requireLogin")

const USER = mongoose.model("USER")


router.post('/signup', (req, res) => {
    const {name, username, email, password} = req.body

    if (!name || !username || !email || !password){
        return res.status(422).json({error: "Please add the required fields"})
    }

    USER.findOne({ $or: [{ email: email }, { username: username }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exist with that email or userName" })
        }

        bcrypt.hash(password, 12).then((hashedPassword) => {


            const user = new USER({
                name, 
                username,
                email,
                password: hashedPassword
            })

            user.save()
            .then(user => {res.json({Message: "Registered Successfully"})})
            .catch(err => {console.log("Error Data not saved")})
        })
    })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        return res.status(422).json({error: "Please add the required fields"})
    }
    USER.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error: "No User found"})
        }
        bcrypt.compare(password, savedUser.password)
        .then((match) => {
            if(!match){
                return res.status(422).json({error: "Wrong Password"})
            }
            else{
                const token = jwt.sign({_id: savedUser.id} ,Jwt_secret)
                const {_id, name, email, userName} = savedUser

                res.json({token, user: { _id, name, email, userName}})
                // return res.status(200).json({Message: "Signed-In Successfull"})
            }
        })
    })


})

module.exports = router;
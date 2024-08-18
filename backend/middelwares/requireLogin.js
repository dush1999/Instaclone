const express = require("express")
const { mongoose } = require("mongoose")
const jwt = require("jsonwebtoken")
const { Jwt_secret } = require("../keys");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(422).json({error: "Please be logged in first"})
    }
    else{
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, Jwt_secret, (err, payload) => {
            if(err){
                return res.status(422).json({error: "Please be logged in first"})
            }
            const { _id } = payload
            USER.findById(_id).then(userData => {
                req.user = userData

                next()
            })    
        })
    }
}
const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    
    like: [{type: ObjectId, ref: "USER"}],

    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" }
    }],

    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
},{timestamps: true } )

mongoose.model("POST", postSchema)
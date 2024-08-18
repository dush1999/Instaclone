const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middelwares/requireLogin");
const POST = mongoose.model("POST")
const USER = mongoose.model("USER");

// To view the profile of the user 
router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .then(posts => {
                    res.json({ user, posts });
                })
                .catch(err => {
                    res.status(500).json({ error: "Internal server error" });
                });
        })
        .catch(err => {
            res.status(500).json({ error: "Internal server error" });
        });
});

// To follow a specific user
router.put("/follow", requireLogin, async (req, res) => {
    const result = await USER.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, {
        new:true
    })
    const result1 = await USER.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, {
            new: true
    })
    res.json({ result, result1 })
    })

// To unfollow a specific user
router.put("/unfollow", requireLogin, async (req, res) => {
    const result = await USER.findByIdAndUpdate(req.body.followId, {
        $pull: {followers: req.user._id}
    }, {
        new:true
    })
    const result1 = await USER.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.followId}
        }, {
            new: true
    })
    res.json({ result, result1 })
    })

// To update a profile pic
router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    const result = await USER.findByIdAndUpdate(req.user._id, {
        $set: {photo: req.body.image}
    }, {
        new: true
    })
    if(result){
        res.json(result)
    }else{
        return res.status(422).json({error: ee})
    }
})

module.exports = router;
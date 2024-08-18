const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middelwares/requireLogin");
const { route } = require("./auth");
const POST = mongoose.model("POST")

// To see all the posts in instagram 
router.get("/allposts", (req, res) => {
    POST.find()
    .populate("postedBy", "_id name photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts =>  res.json(posts))
    .catch(err => console.log(err))
})

// TO CREATE A POST 
router.post("/createpost", requireLogin, (req, res) => {
    const { body, image } = req.body;
    if (!body || !image ) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    req.user

    const post = new POST({
        body,
        image,
        postedBy: req.user
})

    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

// To see all the posts the particular user has posted 
router.get('/myposts', requireLogin, (req,res) => {
    POST.find({postedBy: req.user._id})
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts =>  res.json(posts))
    .catch(err => console.log(err))
})

// To like a particuar post
router.put('/like', requireLogin, async (req, res) => {
    const result = await POST.findByIdAndUpdate(req.body.postId, {
        $push: {like: req.user._id} 
    }, {
        new: true
    }).populate("postedBy", "_id name photo")
    if (!result) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result); 
})

// To unlike a particuar post
router.put('/unlike', requireLogin, async (req, res) => {
    const result = await POST.findByIdAndUpdate(req.body.postId, {
        $pull: {like: req.user._id} 
    }, {
        new: true
    }).populate("postedBy", "_id name photo")
    if (!result) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result); 
})

//to add comments
router.put('/comment', requireLogin, async(req, res) => {
    const comment = {
        comment: req.body.comment,
        postedBy: req.user._id
    }
    const com = await POST.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment} 
    }, {
        new: true
    })
    if (!com) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(com);    
})

// to delete a post
router.delete('/delete/:postId', requireLogin, async (req, res) => {
    const result = await POST.findOne({ _id : req.params.postId})
    .populate("postedBy", "_id name")
    if(!result){
        return res.status(422).json({ error: 'Post not found' })
    }
    if(result.postedBy._id.toString() == req.user._id.toString()){
        await POST.deleteOne({ _id: req.params.postId })
        console.log("successfully deleted")
        return res.status(200).json({message: "Post successfully deleted"})
    }
    else{
        return res.status(422).json({err: "Post not deleted"})
    }

})

// To show only follwoing posts
router.get("/myfollwingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})

module.exports = router;
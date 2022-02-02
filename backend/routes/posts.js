var express = require('express');
var postRouter = express.Router();
var bodyParser = require('body-parser');
var postMessage = require('../models/postMessage');
var mongoose = require('mongoose');

postRouter.use(bodyParser.json());
/* GET users listing. */
postRouter.route('/')
.get((req, res) => {
  postMessage.find({})
  .then((post) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(post);
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });    
  });
})
.post((req, res) => {
  postMessage.create(req.body)
  .then((post) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(post);
  })
  .catch((error) => {
    res.status(409).json({ message: error.message });    
  });
});


postRouter.route('/:id')
.patch((req, res) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("No post with that id");
  }

  postMessage.findByIdAndUpdate(id, req.body , { new: true })
  .then((post) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(post);
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });    
  });
})
.delete((req, res) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("No post with that id");
  }

  postMessage.findByIdAndRemove(id)
  .then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: "Post Deleted Successfully" });
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });    
  });
});

postRouter.route('/:id/likePost')
.patch((req, res) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send("No post with that id");
  }
  console.log(id);
  postMessage.findById(id)
  .then((post)=>{
    const posts = { ...post, likeCount:post.likeCount+1 };
    console.log(posts)
    postMessage.findByIdAndUpdate(id, posts , { new: true })
  })
  .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
  })
  .catch((error) => {
    res.status(404).json({ message: error.message });    
  });
})

module.exports = postRouter;

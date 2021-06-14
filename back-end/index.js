const express = require('express');
const bodyParser= require('body-parser')
const dbClient = require('./src/Service/mgDb');
const user = require('./src/controller/user')
const post = require('./src/controller/post');
const postService = require('./src/Service/post');
const imageService = require('./src/Service/Image');

const app = express();

dbClient.getDBClient().then(() => 'Connected to DB!');

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
    console.log('listening on 3000')
  });

//users

app.post('/user', async (req,res) => {
    const params = req.body;
    const result = await user.addUser(params);
    return res.json({ data: result });
});

app.post('/user-update', async (req,res) => {
    const params = req.body;
    const result = await user.updateUser(params);
    return res.json({ data: result });
});

app.post('/user-delete', async (req,res) => {
    const params = req.body;
    const result = await user.deleteUser(params);
    return res.json({ data: result });
});

app.get('/user',async (req,res) => {
    const params = req.query;
    const  result = await user.getUserById(params);
    return res.json({ data: result });
});

app.post('/follow', async (req, res) => {
    const params = req.body;
    const result = await user.addFollower(params);
    return res.json({data: result});
});

app.post('/unfollow', async (req, res) => {
    const params = req.body;
    const result = await user.removeFollower(params);
    return res.json({data: result});
});

app.get('/followers',async (req, res) => {
    const params = req.query;
    const result = await user.getFollowers(params);
    return res.json({data: result});
});

app.get('/followings',async (req, res) => {
    const params = req.query;
    const result = await user.getFollowings(params);
    return res.json({data: result});
});

app.get('/suggestions', async (req,res) => {
    const params = req.query;
    const result = await user.getSuggestedUser(params);
    return res.json({data: result});
})

//post
app.post('/post', async (req,res) => {
    const params = req.body;
    const result = await postService.createPost(params);
    return res.json({ data: result });
});

app.get('/post',async (req,res) => {
    const params = req.query;
    const result = await post.getPostByIds(params);
    return res.json({ data: result });
});

app.get('/timeline',async (req,res) => {
    const params = req.query;
    const result = await user.getTimeLine(params);
    return res.json({ data: result });
})

app.get('/self',async (req,res) => {
    const params = req.query;
    const result = await user.getSelfTimeLine(params);
    return res.json({ data: result });
});

//image
app.post('/upload',imageService.upload.single('file'),function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
        res.status(500);
        return next(err);
    }
    res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
});

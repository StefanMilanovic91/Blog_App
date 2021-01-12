const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Topic = require('../../models/topicModel');
const Post = require('../../models/postModel');


// desc: get popular topics
// url: /topics/
// public

router.get('/', async (req, res) => {
    try {

        // get all topics
        const allTopics = await Topic.find({});

        // reponse
        res.json({ topics: allTopics });
        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Something went wrong.', error }] });
    }
});

// desc: get topic by id
// url: /topics/:id
// public

router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;

        //console.log(id);

        // get topic
        const topic = await Topic.findById({_id: id});
        //console.log(topic);

        if (!topic) {
            return res.status(400).json({ errors: [{ msg: 'Post not found.' }] });
        }
        // reponse
        res.json({ topic });
        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Something went wrong.', error }] });
    }
});



// desc: add new topic
// url: /topics/add_topic
// private

router.post('/add_topic', [auth, [
    check('title', 'Name of the New Topic is Required.').trim().not().isEmpty()
]], async (req, res) => {

    try {

        let { title } = req.body;
        title = title.replace(/\s/g, '').toLowerCase();
        const { name, id } = req.user;
        
        // validaion
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };


        // check if topic exists
        const foundTopic = await Topic.findOne({ title: title });
        
        if (foundTopic) {
            return res.status(400).json({ errors: [{ msg: 'The topic already exists.' }] });
        }
        


        // create new topic
        const newTopic = new Topic({
            title: title,
            author: {
                id: id,
                name: name
            } 
        });

        // save topic
        await newTopic.save();

        // get all topics
        const allTopics = await Topic.find({});

        // resposne
        res.json({ topics: allTopics, msg: 'You have successfully created a new topic.' });
 


    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'UPS, Something went wrong.', error }] });
    }

});


// desc: add new post to the topic
// url: /topics/add_post
// private

router.post('/add_post/:id', [auth, [
    check('post', 'Post is required.').trim().not().isEmpty()
]], async (req, res) => {
    
    try {

        const { post } = req.body;
        const { name, id } = req.user;
        const url_id = req.params.id;

        // validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        // make new post
        console.log(post);
        let newPost = new Post({
            author: {
                id: id,
                name: name
            },
            topic: {
                id: url_id
            },
            post: post
        });

        await newPost.save();

        // get all posts

        let allPosts = await Post.find({});

        res.json({
            posts: allPosts
        });
        // nastavi odavde, pokupi sve podatke iz ovog respona i prikazi ih na stranici...

        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }

})




module.exports = router;
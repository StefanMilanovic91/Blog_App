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

        // get all posts and topics
        let topics = await Topic.find({}).lean();
        const posts = await Post.find({});
        
        // add number of post for certain topic
        for (let i = 0; i < topics.length; i++) {
            let counter = 0
            for (let x = 0; x < posts.length; x++){
                if (topics[i]._id == posts[x].topic.id) {
                    topics[i].numberOfPosts = ++counter; 
                }
            }
            
        }

        // reponse
        res.json({ topics });
        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Something went wrong.', error }] });
    }
});

// desc: get all posts by topic id
// url: /topics/get_posts/:id
// public

router.get('/get_posts/:id', async (req, res) => {
    try {

        const id = req.params.id;

        // get posts
        const posts = await Post.find({ topic: { id: id } });

        if (!posts) {
            return res.status(400).json({ errors: [{ msg: 'Posts for this topic not found.' }] });
        }

        // reponse
        res.json({ posts });
        
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

        // resposne
        res.json({ topic: newTopic, msg: 'You have successfully created a new topic.' });
 


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
        const topic_id = req.params.id;

        // validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        // make new post
        let newPost = new Post({
            author: {
                id,
                name
            },
            topic: {
                id: topic_id
            },
            post: post
        });
        // nastavi odavde, vrati postove samo za taj topic, nikako sve...
        await newPost.save();

        // get all posts

        //let allPosts = await Post.find({ topic: { id: topic_id } });
        
        res.json({ newPost });
        

        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }

});

// desc: add new comment to the certain post
// url: /topics/add_comment
// private

router.post('/add_comment', [auth,
    [
        check('id', 'Post id is required.').trim().not().isEmpty(),
        check('comment', 'Comment is required.').trim().not().isEmpty()
    ]
], async (req, res) => {

    try {
        
        const { id, comment } = req.body;
        const name = req.user.name;
        const user_id = req.user.id;

        // validation
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), post_id: id });
        }

        const post = await Post.findById(id);

        const newComment = post.comments.create({
            author: {
                id: user_id,
                name
            },
            comment: {
                text: comment
            }
        });

        post.comments.push(newComment);
        
        await post.save();

        res.json({comment: newComment});

        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
        
});





// desc: add new comment to the certain post and certaine comment
// url: /topics/add_comment_on_comment
// private

router.post('/add_comment_on_comment', [auth,
    [
        check('postId', 'Post id is required.').trim().not().isEmpty(),
        check('commentId', 'Comment id is required.').trim().not().isEmpty(),
        check('comment', 'Comment is required.').trim().not().isEmpty()
    ]
], async (req, res) => {

    try {
        const { postId, commentId, comment } = req.body;
        const name = req.user.name;
        const user_id = req.user.id;

        // validation
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), comment_id: commentId });
        }

        let post = await Post.findById(postId);

        // find comment and push sub comment to this comment
        let commentIndex = post.comments.findIndex(comment => comment._id == commentId);

        // create sub comment
        const newSubComment = post.comments[commentIndex].comment.comments.create({
            author: {
                id: user_id,
                name
            },
            comment: {
                text: comment
            }
        });
        
        // add new sub comment to sub comments array
        post.comments[commentIndex].comment.comments.push(newSubComment);

        await post.save();

        res.json({ newSubComment: newSubComment });
        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
        
});

// desc: delete certain post by id
// url: /topics/delete_post
// private

router.delete('/delete_post/:id', auth, async (req, res) => {
    
    try {
        
        const { id } = req.params;
        const user_id = req.user.id
        
        const post = await Post.findById(id);
        
        if (post.author.id.toString() !== user_id) {
            return res.status(401).json({ errors: [{ msg: "Not Authorized." }] });
        }

        await post.remove();

        res.json({ msg: 'Post is removed.' });

    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
});

// desc: delete comment in certain post 
// url: /topics/delete_post
// private

router.delete('/delete_comment/:postID/:commentID', auth, async (req, res) => {
    
    try {
        
        const { postID, commentID } = req.params;
        const post = await Post.findById(postID);
        

        await post.comments.pull({ _id: commentID });
        await post.save();

        res.json({ msg: 'Comment is removed.' });

    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
});


// desc: delete comment in certain post 
// url: /topics/delete_post
// private

router.delete('/delete_subcomment/:postID/:commentID/:subcommentID', auth, async (req, res) => {
    
    try {
        
        const { postID, commentID, subcommentID } = req.params;

        const post = await Post.findById(postID);
        let commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentID);

        await post.comments[commentIndex].comment.comments.pull({ _id: subcommentID });
        await post.save();

        res.json({ msg: 'Subcomment is removed.' });

    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
});

// desc: like/unlike post 
// url: /topics/like_unlike/:postID
// private

router.post('/like_unlike/:postID', auth, async (req, res) => {
    
    try {
        
        const { postID } = req.params;
        const { name, id } = req.user;
        
        const post = await Post.findById(postID);

        // if user already liked
        const removeIndex = post.likes.findIndex(like => like.author.id.toString() === id);
        
        // like if d'not exist
        if (removeIndex === -1) {
            let newLike = post.likes.create({
                author: {
                    id,
                    name
                }
            });

            await post.likes.push(newLike);
            await post.save();

            return res.json({ like: newLike, unlike: false });
        }
        
        // remove like
        let like = post.likes.splice(removeIndex, 1);
        await post.save();
        
        res.json({ msg: 'Post is unliked.', like: like[0], unlike: true });
 
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Ups, Something went wrong.', error }] });
    }
});

module.exports = router;
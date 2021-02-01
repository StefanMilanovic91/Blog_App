const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    topic: {
        id: {
            type: String,
            required: true
      }  
    },
    post: {
        type: String,
        required: true
    },
    comments: [
        {
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
            },
            comment: {
                text: {
                    type: String,
                    required: true
                },
                comments: [
                    {
                        author: {
                            id: {
                                type: mongoose.Schema.Types.ObjectId,
                                required: true
                            },
                            name: {
                                type: String,
                                required: true
                            }
                        },
                        comment: {
                            text: {
                                type: String,
                                required: true
                            }
                        }
                    }
                ]
            }
        }
    ],
    likes: [
        {
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }
        }
    ]
});

module.exports = Post = mongoose.model("Post", PostSchema);
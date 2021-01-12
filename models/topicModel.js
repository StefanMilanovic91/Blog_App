const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
/*    posts: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
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
                        type: String,
                        required: true
                    },
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
        }
    ]*/
});

module.exports = Topic = mongoose.model("Topic", TopicSchema);
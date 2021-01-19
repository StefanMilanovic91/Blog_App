import axios from 'axios';

class TopicServices {
    
    static getAllTopics() {
        return axios.get('/topics');
    }

    static getPostsByTopicId(id) {
        return axios.get(`/topics/get_posts/${id}`);
    }

    static addTopic(title, token) {

        return axios.post('/topics/add_topic', title, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json"
                
            }
        });

    }

    static addNewPost(post, token, id) {
        
        return axios.post(`/topics/add_post/${id}`, post, {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
            
        })
    }

    static addComment(body, token) {

        return axios.post('/topics/add_comment', body, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
    }

    static addCommentOnComment(body, token) {

        return axios.post('/topics/add_comment_on_comment', body, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
    }

    static removePost(id, token) {
        
        return axios.delete(`/topics/delete_post/${id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
    }
 
};


export default TopicServices;
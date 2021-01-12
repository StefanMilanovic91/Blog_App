import axios from 'axios';

class TopicServices {
    
    static getAllTopics() {
        return axios.get('/topics');
    }

    static getTopicById(id) {
        return axios.get(`/topics/${id}`);
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
 
};


export default TopicServices;
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => { 

    try {
        
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Successful connection to the MongDB.');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }  

}

module.exports = connectDB
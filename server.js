const express = require('express');
const  connectDB = require('./config/config');

require('dotenv').config();

// create app
const app = express();

// connect to DB
connectDB();  

// middlewares
app.use(express.json({ extended: false }));

app.use('/user', require('./routes/userAuthentication/userAuthentication')); 
app.use('/topics', require('./routes/topics/topics')); 



const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {   
    console.log('Start server on port ' + PORT);
}); 
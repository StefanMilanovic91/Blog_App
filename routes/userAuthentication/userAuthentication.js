const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/userModel');


// desc: user register
// url: /user/register
// public

router.post('/register', [
    check('name', 'The name must not have more than 15 characters.').trim().isLength({ max: 15 }),
    check('email', 'Include a valid email address').isEmail(),
    check('password', 'Password must have min 5 and max 50 character.').trim().isLength({ min: 5, max: 50 })
], async (req, res) => {
        
        try {

            let { name, email, password } = req.body;
           
            // validation
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                
                return res.status(400).json({ errors: errors.array() });
            }
            // check name existing
            if (!name) {
                name = email;
            } 

            // check if user existing
            let foundUser = await User.findOne({ email: email });
            
            if (foundUser) {
                return res.status(400).json({ errors: [{ msg: 'User with this email already exists' }] });
            }

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            // create user model
            const newUser = new User({
                name,
                email,
                password: hashPass
            });
            // save user
            await newUser.save();

            res.json({ msg: "You are successefuly registered. Please Log In." });


        } catch (error) {
            res.status(500).json({ errors: [{ msg: error.message }] });
        }
        
        

});


// desc: user login
// url: /user/login
// public

router.post('/login', [
    check('email', 'Include a valid email address').isEmail(),
    check('password', 'Password must have min 5 and max 50 character.').isLength({min: 5, max: 50})
], async (req, res) => {

        try {

            const { email, password } = req.body;

            // validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // find user
            const foundUser = await User.findOne({ email: email });
            
            if (!foundUser) {
                return res.status(400).json({ errors: [{ msg: 'You are trying to login as an unregistered user. Please register first.' }] })
            }

            // check match password
            let isMatch = await bcrypt.compare(password, foundUser.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credetials' }] }); 
            }

            // create payload and token 

            let payload = {
                id: foundUser._id,
                name: foundUser.name
            };

            jwt.sign(payload, process.env.JWT_SECRET_STRING, { expiresIn: 3600 }, (err, token) => {
                if (err) return res.status(400).json({ errors: [{ msg: 'Something went wrong.' }] });
                res.json({token});
            });



        } catch (error) {
            res.status(500).json({ errors: [{ msg: error.message }] });
        }
        
});

module.exports = router; 
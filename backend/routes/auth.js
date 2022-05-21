const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


const JWT_SECRET = "$HemanSharma";

// Create a User using Post "/api/auth". No login required
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    //IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check wether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: "Sorry a  user with this email already exists" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashsecurePass = await bcrypt.hash(req.body.password, salt);
        // Creating new user into database(mongoDb)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashsecurePass,
        });

        // .then(user => res.json(user))
        //     .catch(err => {
        //         console.log(err)
        //         res.json({ errors: 'Please enter a unique value for email',message:err.message })
        //     })

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
        //res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
});

module.exports = router;
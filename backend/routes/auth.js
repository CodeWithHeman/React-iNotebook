const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = "$HemanSharma";

//ROUTE 1 : Create a User using Post "/api/auth". No login required
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    //IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check wether the user with this email exists already
    user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({success, error: "Sorry a  user with this email already exists" });
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
        success=true;
        res.json({success, authtoken });
        //res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }
});

//ROUTE 2 : Authenticate a User using Post "/api/auth". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    //IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {            
            return res.status(400).json({success, error: 'Please try to login with correct credentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {           
            return res.status(400).json({success, error: 'Please try to login with correct credentials' });
        }

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }

});

//ROUTE 3 : Get loggedin User Details using Post "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        // This .select('-name') used to remove attribute from res.sent json
        //console.log(User.findById(userId).select('_password').select('-name'));
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured");
    }
});



module.exports = router;
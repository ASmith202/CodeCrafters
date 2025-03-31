const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    console.log('Register request received:', { username, email, password: '[hidden]' });

    try {
        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        console.log('User exists check:', userExists ? 'User found' : 'No user found');

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Generated hash:', hashedPassword);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        console.log('User object before save:', {
            username: user.username,
            email: user.email,
            password: '[hashed]'
        });

        await user.save();
        console.log('User saved successfully');
        
        res.status(201).json({ 
            message: 'User created successfully',
            userId: user._id 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // console.log('Login request received:', { email, password: '[hidden]' });

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const loggeduser = await User.findOne({ email });
        // console.log('User found:', loggeduser ? 'Yes' : 'No');

        if (!loggeduser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Debug password comparison
        // console.log('Comparing passwords:');
        // console.log('Received password:', '[hidden]');
        // console.log('Stored hash:', loggeduser.password);
        
        const isMatch = await bcrypt.compare(password, loggeduser.password);
        // console.log('Password match result:', isMatch);

        if (!isMatch) {
            // Additional debug: generate hash with received password
            const testHash = await bcrypt.hash(password, 10);
            // console.log('Hash of received password:', testHash);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ 
            id: loggeduser._id,
            email: loggeduser.email 
        }, process.env.JWT_SECRET, { 
            expiresIn: '30d' 
        });

        // console.log('Login successful for user:', token);
        res.json({ 
            token,
            user: {
                id: loggeduser._id,
                email: loggeduser.email,
                username: loggeduser.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
});

// Debug route to verify password
router.post('/debug-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        const newHash = await bcrypt.hash(password, 10);
        
        res.json({
            receivedPassword: '[hidden]',
            storedHash: user.password,
            isMatch: isMatch,
            newHashOfReceivedPassword: newHash
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
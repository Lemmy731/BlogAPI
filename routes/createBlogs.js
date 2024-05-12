const express = require('express');
const blogRouter = express.Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const { authenticateToken } = require('../authenticate/jwtAuthenticate');

// Endpoint to create a blog post
blogRouter.post('/blogs', authenticateToken, async (req, res) => {
    try {
        const { title, description, tags, body } = req.body;

        // Validate blog post data
        if (!title || !description || !body) {
            return res.status(400).json({ error: 'Title, description, and body are required' });
        }

        // Get the user ID from the authenticated token
        const userId = req.user.userId;

        const newBlog = new Blog({
            title,
            description,
            tags,
            body,
            author: userId,
            state: 'draft' 
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = blogRouter;

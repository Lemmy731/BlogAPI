const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Route to get a list of blogs with pagination
router.get('/', async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json(blogs);
  } catch (error) {

    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

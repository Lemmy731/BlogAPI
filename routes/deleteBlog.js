const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); 

// DELETE endpoint to delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('blogId:', id);
        console.log("this is good");

        // Find the blog post by ID
        const blog = await Blog.findById(id);

        console.log(blog.title);
        console.log(blog.author);
       

        // Check if the blog post exists
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        console.log(req.user);

        console.log(req.user.userId);

        // Check if the user is authorized to delete the blog post (owner verification)
        if (blog.author !== req.user.userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this blog post' });
        }
        
        console.log(req.user.userId);
        
        // Delete the blog post
        await Blog.deleteOne( { _id: id});
        

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal server error 12' });
    }
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('./config/config');
const userRegister = require('./routes/users');
const signIn = require('./routes/signIn');
const blogCreate = require('./routes/createBlogs');
const blogDelete = require('./routes/deleteBlog');
const getBlog = require('./routes/GetBlogs');
const { authenticateToken } = require('./authenticate/jwtAuthenticate');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Route for user registration
app.post('/register', userRegister);
//route for sign in
app.post('/signin', signIn);
//route for get blogs
app.get('/', getBlog);

//route for user authentication
app.use(authenticateToken);


//route for create blog
app.post('/blogs', blogCreate);
//route for delete blog
app.delete('/:id', blogDelete);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    if (err.statusCode) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    next();
});

// Connect to MongoDB and start server
db.connectToMongoDB().then(() => {
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

const express = require('express');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res, next) => {
    res.send('hello world');
});

app.listen(3000);
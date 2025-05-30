const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(("/register"), (req, res) => {
    let {username, password} = req.query;
    res.send(`User: ${username}, Password: ${password}`);
});

app.post(("/register"), (req, res) => {
    let {username, password} = req.body;
    res.send(`User: ${username}, Password: ${password}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
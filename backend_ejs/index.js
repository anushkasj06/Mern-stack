const path = require('path');
const express = require('express');

const posrt = 8000;
const app = express();

app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get("/ig/:username",(req, res) => {
    const instadata = require("./data.json");
    const {username} = req.params;
    const data = instadata[username];
    if (data) {
        res.render("instagram.ejs", { data });
    }else{
        res.render("error.ejs");
    }
})
    


app.listen(posrt, () => {
    console.log(`Server is running on http://localhost:${posrt}`);
})
const express = require('express');
const { userInfo } = require('os');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

app.set('view engine', 'ejs');
app.set ('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts =[
    {
        id:uuidv4(),
        username: "apnacollege",
        content:"I love Coding"
    },
    {
        id:uuidv4(),
        username: "anushka jadhav",
        content:"I love myself"
    },
    {
        id:uuidv4(),
        username: "siddhi",
        content:"I love my  family"
    }
]


app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    console.log(posts);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    post.content = newContent;
    console.log(posts);
    res.redirect("/posts");

});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs", { post });
})


app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    post = posts.filter((p) => p.id !== id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    posts = post;
    console.log(posts);
    res.redirect("/posts");

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
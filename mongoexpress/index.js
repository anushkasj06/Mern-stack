const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');



const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// MongoDB connection
main()
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch(err => console.log("MongoDB connection error", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/chats", async (req, res) => {
  const chats = await  Chat.find().sort({ created_at: -1 });
  res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res)=>{
  res.render("new.ejs");
});

app.post("/chats", (req, res) => {
  const { from, to, msg } = req.body;
  const newchat = new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at: new Date()
  });
  newchat.save()
    .then(() => console.log("Chat saved"))
    .catch(err => console.log("Error saving chat", err));
  res.redirect("/chats");
});

app.get("/chats/:id/edit", (req, res)=>{
  let {id} = req.params;
  Chat.findById(id)
    .then(chat => {
      if (!chat) {
        return res.status(404).send("Chat not found");
      }
      res.render("edit.ejs", { chat });
    })
    .catch(err => {
      console.log("Error fetching chat", err);
      res.status(500).send("Internal Server Error");
    });
});

app.put("/chats/:id", (req, res) => {
  let {id} = req.params;
  const {msg} = req.body;
  Chat.findByIdAndUpdate(id, { msg: msg }, { runValidators: true, new: true })
    .then(() => {
      
      res.redirect("/chats");
    })
    .catch(err => {
      console.log("Error updating chat", err);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/chats/:id", (req, res) => {
  let {id} = req.params;
  Chat.findByIdAndDelete(id)
    .then(() => {
      console.log("Chat deleted");
      res.redirect("/chats");
    })
    .catch(err => {
      console.log("Error deleting chat", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get('*', (req, res) => {
  res.render("notfound.ejs");
});


// Basic route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

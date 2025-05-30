const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
  .then(() => {
    console.log("MongoDB connected");
    
  })
  .catch(err => console.log("MongoDB connection error", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


const allChat = ([
    {
        from: "Alice",
        to: "Bob",
        msg: "Hello Bob!",
        created_at: new Date("2023-10-01T10:00:00Z")
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hi Alice! How are you?",
        created_at: new Date("2023-10-01T10:05:00Z")
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "I'm good, thanks! And you?",
        created_at: new Date("2023-10-01T10:06:00Z")
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Doing well, just busy with work.",
        created_at: new Date("2023-10-01T10:07:00Z")
    }
]);

Chat.insertMany(allChat)
  .then(() => {
    console.log("All chats saved");
  })
  .catch(err => {
    console.log("Error saving chats", err);
  });

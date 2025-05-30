const mongoose = require('mongoose');

main().then(()=>{
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

// const user1 = new User({
//     name: "anushka",
//     email: "anu@gmail.com",
//     age: 19,
// });

// user1.save()
//     .then((res) => {
//         console.log("User saved successfully",res);
//     })
//     .catch((err) => {
//         console.error("Error saving user:", err);
//     });


// User.insertMany([
//     {name: "John", email: "john@gmail.com", age: 25},
//     {name: "Jane", email: "jane@gmail.com", age: 30},
//     {name: "Doe", email: "doe@gmail.com", age: 35},
// ])
// .then((res)=>{
//     console.log("Users inserted successfully",res);
// });

// User.find({})
// .then((res) => {
//     console.log("Users found successfully", res);
// })
// .catch((err) => {
//     console.error("Error finding users:", err);
// });


// User.find({name: "John"})
// .then((res) => {
//     console.log("Users found successfully", res);
// })
// .catch((err) => {
//     console.error("Error finding users:", err);
// });

// User.find({age: {$gt: 20}})
// .then((res) => {
//     console.log("Users found successfully", res);
// })
// .catch((err) => {
//     console.error("Error finding users:", err);
// });


// User.find({})
// .then((res) => {
//     console.log(res[0].name);
// })
// .catch((err) => {
//     console.error("Error finding users:", err);
// });


User.findOne({age : {$gt: 30}})
.then((res) => {
    console.log("User found successfully", res);
})
.catch((err) => {
    console.error("Error finding user:", err);
});
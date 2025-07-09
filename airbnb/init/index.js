const mongoose = require('mongoose');
const initdata = require('./data.js');
const { Listing } = require('../models/Listing.js');


const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "686b8e0db91f91dfb09d1b52",
    }));
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data");
};

initDB();

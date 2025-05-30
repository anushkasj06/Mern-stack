import express from 'express';
import mysql from 'mysql2';
import { faker } from '@faker-js/faker';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anushka@2006',  // Use env variable for production!
  database: 'delta_app'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
});

// Generate a random user (optional feature)
const getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8, pattern: /[a-zA-Z0-9]/ })
  };
};

// Routes
app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";
  try{
    connection.query(q, (err, data) => {
      if(err) throw err;
      let count = data[0]["COUNT(*)"];
      console.log("Count:", count);  // Log the count to see it
      res.render("home.ejs", { count });
    });
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});


app.get("/user", (req, res) => {
let q = "SELECT * FROM user";
try{
    connection.query(q, (err, data) => {
      if(err) throw err;
      res.render("showusers.ejs", { data });
    });
  } catch(err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, (err, data) => {
      if(err) throw err;
      let user = data[0];
      res.render("edit.ejs", { user });
    });
  }catch(err){
    console.log(err);
    res.send(err);
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let {password: formpassword, username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, (err, data) => {
      if(err) throw err;
      let user = data[0];
      if(formpassword != user.password){
        res.send("Wrong Password");
      }else{
        let q = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q, (err, data) => {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  }catch(err){
    console.log(err);
    res.send(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


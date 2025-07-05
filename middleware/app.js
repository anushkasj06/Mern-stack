const express = require('express');
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError");

// app.use((req, res,next) =>{
//     console.log("middleware");
//     next();
//     console.log("i am after next()")
// })

// app.use((req,res, next)=>{
//     req.time = Date.now().toString();
//     console.log(req.method+" "+req.hostname+" "+req.pathname+" "+req.path+" "+req.time);
//     next();
// })


// app.use("/random", (req, res, next)=>{
//   console.log("middleware only for the random page");
//   next();
// })

// app.use("/api", (req, res, next)=>{
//   let {token} = req.query;
//   if(token == "giveaccess"){
//   next();
//   }
//   res.send("access denied");
// })

const checktoken = (req, res, next)=>{
  let {token} = req.query;
  if(token == "giveaccess"){
  next();
  }

  throw new ExpressError(401,"access denied");
}

// app.get("/err", (req, res)=>{
//   abcd= abcd;
// })


app.use((err, req, res, next)=>{
  let {status, message} = err;
  console.log("error message: "+message);
  console.log("code: "+status);
  res.status(status).send(message);

  // res.send("---------ERROR---------");
  // next(err);
})

// app.use((err, req, res, next)=>{
//   console.log("-----Error2-----");
//   // res.send("---------ERROR---------");
//   next(err);
// })



app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get("/random", (req, res) => {
    res.send("i am random page")
})

app.get("/api", checktoken,(req, res)=>{
  res.send("data");
})

// app.use((req, res)=>{
//   res.status(404).send("page not found");
// })

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


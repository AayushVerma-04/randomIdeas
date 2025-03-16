const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
let x;
// const path = require('path');

// const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:false})); //to parse form data
// app.use(express.static(path.join(__dirname, 'public')));

const ideasRouter = require('./routes');

app.get('/',(req,res)=>{
  res.send('Welcome');
})

app.use('/api/ideas', ideasRouter);

mongoose
  .connect(
    "mongodb+srv://Aayush:qwerty04@cluster0.jpz07.mongodb.net/randomideas?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
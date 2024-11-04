const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const routes = require('./routes/userRoute');
const cookieParser = require("cookie-parser");
const app = express();

//database connection
const url = "mongodb://127.0.0.1:27017/quiz";
mongoose.connect(url)
  .then(()=>console.log("Mongodb connected"))
  .catch((err)=>console.log(err));

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser);

//Routes
app.use("/api",routes);

// async function getQuestions(data){
//     const URL = `https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
//     let res = await fetch(URL)
//     let questions = await res.json()
//     return questions
// }


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
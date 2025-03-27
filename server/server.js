const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const quizRoutes = require('./routes/quizRoutes');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//database connection
const url = process.env.MONGODB_URL;
mongoose.connect(url)
  .then(()=>console.log("Mongodb connected"))
  .catch((err)=>console.log(err));

// Middleware
const corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api",userRoutes);
app.use("/api",quizRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
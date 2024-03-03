const express = require("express");
const cors = require("cors");
const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs')
const users = require('./users')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname+"/public")))

function verifyLogin(data) {
    if (users.hasOwnProperty(data.username)) {
        if (data.password === users[data.username].password) {
            return {
                status: true,
                data: {
                    isUserLoggedIn: true,
                    name: users[data.username].name,
                    email: users[data.username].email
                }
            }
        }
        else {
            return {
                status: false,
                message: "*Password incorrect!"
            }
        }
    }
    else {
        return {
            status: false,
            message: "*User not found!"
        }
    }
}

function insertUser(data) {
    console.log(data)
    users[data.email] = data
    fs.writeFile("users.json", JSON.stringify(users), err => {
        if (err) throw err;
    });
}


function verifySignup(data) {
    if (!users.hasOwnProperty(data.username)) {
        if (data.password1 === data.password2) {
            insertUser({ name: data.username, email: data.email, password: data.password1 })
            return {
                status: true,
                data: {
                    isUserLoggedIn: true,
                    name: data.username,
                    email: data.email
                }

            }
        }
        else {
            return {
                status: false,
                message: "*Both passwords must be same!"
            }
        }
    }
    else {
        return {
            status: false,
            message: "*User already exists!"
        }
    }
}

async function getQuestions(data){
    const URL = `https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
    let res = await fetch(URL)
    let questions = await res.json()
    return questions
}

app.post("/login", (req, res) => {
    res.send(verifyLogin(req.body))
});

app.post("/signup", (req, res) => {
    res.send(verifySignup(req.body))
});

app.post("/contact", (req, res) => {
    res.send({ 'status': true })
});

app.post("/quiz" , async (req,res)=>{
    try{
        let data = await getQuestions(req.body)
        res.send({status:true , questions : data})
    }
    catch{(err)=>
        res.send({status: false , message : err})
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
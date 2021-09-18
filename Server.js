const express = require("express");
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const register = require('./Modules/Register');
const login = require('./Modules/Login')
const app = express();
const authenticate = require('./Modules/Authenticate');

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 5000;


// app.get('/users', (req, res) => {
//     let queryname = req.query.name;
//     console.log(queryname);
//     res.send(queryname);
// })

//Create User
app.post('/register', register)
//Login
app.post('/login', login)

app.get('/user', authenticate, (req, res) => {
    res.json({
        message: "success",
        userid: req.body.userid
    })
})
app.listen(PORT, () => console.log(`App is running in http://localhost:${PORT}`))
const express = require("express");
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoClient = mongodb.MongoClient;
const mongo_url = "mongodb://localhost:27017"

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// app.get('/users', (req, res) => {
//     let queryname = req.query.name;
//     console.log(queryname);
//     res.send(queryname);
// })

//Create User
app.post('/register',)

app.listen(PORT, () => console.log(`App is running in http://localhost:${PORT}`))
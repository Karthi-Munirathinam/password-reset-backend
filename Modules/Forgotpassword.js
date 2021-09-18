const mongodb = require("mongodb");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const forgotpassword = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("FPadmin");
        //Check user exists
        let user = await db.collection('users').findOne({ email: req.body.email });
        if (user) {
            //generate random string
            let randomString = randomstring.generate();
            //send a mail

            //store random string
            await db.collection('users').findOneAndUpdate({ email: req.body.email }, { $set: { randomFP: randomString, modified: new Date() } });
        }
        else {
            res.status(404).json({
                message: "User doesnot exist"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = forgotpassword
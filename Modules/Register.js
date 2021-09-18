const mongodb = require("mongodb");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedpassword = bcrypt.hashSync(req.body.password, salt);
        const reqdata = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedpassword
        }
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("FPadmin");
        //Select the collection and perform operation
        let data = await db.collection('users').insertOne(reqdata);
        res.json({
            message: "success!"
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}
require("dotenv").config()


const dbURL = process.env.MONGO_URL;



module.exports = {dbURL}
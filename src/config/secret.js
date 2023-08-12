require("dotenv").config()


const dbURL = process.env.MONGO_URL;

const jwtKey = process.env.JWT_SECRET;

module.exports = {dbURL, jwtKey}
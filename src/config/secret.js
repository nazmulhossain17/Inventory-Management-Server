require("dotenv").config()


const dbURL = process.env.MONGO_URL;

const jwtKey = process.env.JWT_SECRET;

const emailHost = process.env.EMAIL_HOST;

const emailUser = process.env.EMAIL_USER;

const emailPass = process.env.EMAIL_PASSWORD;

module.exports = {dbURL, jwtKey, emailHost, emailUser, emailPass}
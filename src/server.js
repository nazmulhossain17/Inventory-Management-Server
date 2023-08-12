const mongoose = require("mongoose");
const app = require("./app");
const { dbURL } = require("../src/config/secret");

const PORT = 3000;

const connctDB = async(req, res)=>{
    try {
        mongoose.connect(dbURL)
        console.log('Database connected');
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

connctDB();
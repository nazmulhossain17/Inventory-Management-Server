const express = require("express");
const { registerUser } = require("../controller/user.controller");
const router = express.Router();

router.get("/test", (req, res)=>{
    res.send("Done")
});

router.post("/register", registerUser)


module.exports = router;
const express = require("express");
const { registerUser, loginUser } = require("../controller/user.controller");
const router = express.Router();

router.get("/test", (req, res)=>{
    res.send("Done")
});

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", loginUser)


module.exports = router;
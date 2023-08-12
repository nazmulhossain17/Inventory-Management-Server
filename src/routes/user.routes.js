const express = require("express");
const { registerUser, loginUser, logOut, getUser, loginStatus } = require("../controller/user.controller");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/test", (req, res)=>{
    res.send("Done")
});

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);


module.exports = router;
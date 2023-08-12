const express = require("express");
const { registerUser, loginUser, logOut, getUser } = require("../controller/user.controller");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/test", (req, res)=>{
    res.send("Done")
});

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logOut);
router.get("/getuser", protect, getUser);


module.exports = router;
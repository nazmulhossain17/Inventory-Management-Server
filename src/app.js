const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(cors()); // Add the CORS middleware

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(errorHandler)
app.use("/api/v1/", userRouter);

app.get("/", (req, res) => {
    res.send("Working");
});

module.exports = app;

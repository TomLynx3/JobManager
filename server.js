const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
var fileupload = require("express-fileupload");
const app = express();

//Connect Database

connectDB();

//Init Middleware (bodyparser)

app.use(express.json({ extended: false }));
app.use(fileupload());
//Define Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/statement", require("./routes/statement"));

//Serve static assests in production

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));

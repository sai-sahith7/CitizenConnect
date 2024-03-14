const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/init");

app.use(cors());
app.use(bodyParser.json());

const aadhaarAuth = require("./routes/aadhaarAuth");

// const userAuthMiddleware = passport.authenticate("checkJWT", {
//   session: false,
// });

app.get("/", (req, res) => {
  res.send("API is up and running !!");
});

app.use("/auth", aadhaarAuth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port:", PORT));

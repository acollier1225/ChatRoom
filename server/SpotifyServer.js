const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5001;
require("dotenv").config();

const router = require('./spotifyRouter');
app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const AuthRoutes = require("./authRoutes");
app.use(AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
})

module.exports = router;
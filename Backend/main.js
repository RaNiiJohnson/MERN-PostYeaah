require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/PostYeaah")
  .then(
    app.listen(5000, () => {
      console.log("connected on port 5000");
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/user", userRoutes);
app.use("/post", postRoutes);

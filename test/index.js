const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/user");
const orders = require("./routes/order");

app.use(express.json());
app.use("/api/users", users);
app.use("/api/orders", orders);

mongoose
  .connect("mongodb://localhost/backend-Project", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}....`));

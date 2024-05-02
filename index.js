const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes/stock.routes");

const app = express();

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://stocks:IWnXvBEBlPo6vEz4@logbook.eyaj0tg.mongodb.net/logbook?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", routes);

app.listen("4000", () => {
  console.log(`Server is running on port 4000`);
});

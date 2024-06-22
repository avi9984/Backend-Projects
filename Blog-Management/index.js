const express = require("express");
const bodyParser = require("body-parser");
const route = require("./router/route.js");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/Blog-Management",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});

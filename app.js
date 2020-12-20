const express = require("express");
const app = express();
const PORT = 2000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


(async function () {
  try {
    await mongoose.connect(process.env.DB);
    return console.log(`Successfully connected to database`);
  } catch (error) {
    console.log(`Error connecting to DB`, error);
    return process.exit(1);
  }
})();

app.use("/api", userRoutes.router);

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});

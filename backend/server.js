// import mongoose
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;

// initialize dotenv
require('dotenv').config();

app.use(express.json());

// function to connect to MongoDB
const uri = process.env.MONGO_URI;
async function connectDb() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error: " + error);
    await mongoose.disconnect();
  }
}

app.listen(PORT, async () => {
  await connectDb().catch(console.dir);
  console.log(`Express API started: http://localhost:${PORT}`);
});
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();

const PORT = 8001;

// Connect to database
connectToMongoDB("mongodb://localhost:port/url-shortener")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`Couldn't connect to MongoDB: ${err}`));

app.use(express.json());

// Home - Generate
app.use("/", urlRoute);

// Redirection
app.use("/:shortId", urlRoute);

// Analytics
app.use("/analytics/:shortId", urlRoute);
  
app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));

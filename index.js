const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/Productroutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/CrudDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Product API connected to MongoDB!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

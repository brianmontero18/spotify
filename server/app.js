const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { sequelize } = require("./models");

const app = express();
// Configure multer to handle multipart forms
const upload = multer();

app.use(cors());
app.use(upload.array()); // Allows parsing form fields
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Example routes
app.get("/", (req, res) => {
  res.send("API working");
});

// Import authentication and user routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

// Add routes to your application
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connection established.");
});

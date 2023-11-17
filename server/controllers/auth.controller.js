const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = require("../models");

const jwtSecretKey = "my_very_secure_and_long_secret_key";

const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists by email
    const existingUser = await models.User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // If the user does not exist, create a new one
    try {
      const user = await models.User.create({ username, email, password });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering the user" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Generate an authentication token
      const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
        expiresIn: "1h", // Change this based on your needs
      });

      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error in login." });
    }
  },
};

module.exports = authController;

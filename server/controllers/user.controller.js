const models = require("../models");

const userController = {
  getAllUsers: async (_, res) => {
    try {
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to retrieve users." });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await models.User.findByPk(req.params.id);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to retrieve the user." });
    }
  },

  createUser: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = await models.User.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create the user." });
    }
  },

  updateUser: async (req, res) => {
    try {
      const [updatedRows] = await models.User.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedRows > 0) {
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to update the user." });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedRows = await models.User.destroy({ where: { id: req.params.id } });

      if (deletedRows > 0) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to delete the user." });
    }
  },
};

module.exports = userController;

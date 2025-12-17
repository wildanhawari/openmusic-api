const express = require('express');
const validate = require('../middlewares/validator');
const UserValidator = require('../validators/UserValidator');

const createUserRoutes = (userController) => {
  const router = express.Router();

  router.post(
    '/users',
    validate(UserValidator),
    userController.createUser.bind(userController)
  );

  return router;
};

module.exports = createUserRoutes;
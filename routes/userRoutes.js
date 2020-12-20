const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const verify = require("../controllers/verifyToken");


router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/suggest", verify.auth, productController.suggestItem);
router.get("/suggested/:category", verify.auth, productController.suggested);
router.get("/suggested", verify.auth, productController.allSuggested);

module.exports = {
  router,
};

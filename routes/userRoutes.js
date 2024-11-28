const express = require("express");
const { updateUserController } = require("../Controllers/userController.js");
const { userAuth } = require("../middelwares/authMiddleware.js"); // Assurez-vous que l'import est correct
const router = express.Router();
//console.log(typeof updateUserController); 
//console.log(typeof userAuth); 
router.patch("/update-user/:id", userAuth, updateUserController);
module.exports = router;

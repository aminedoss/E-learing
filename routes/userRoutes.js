const express = require("express");
const { updateUserController,getAllUsers } = require("../Controllers/userController.js");
const {userAuth,isAdmin} = require("../middelwares/authMiddleware.js");
const router = express.Router();
//console.log(typeof updateUserController); 
//console.log(typeof userAuth); 
router.patch("/update-user/:id", userAuth, updateUserController);
router.get("/All-user",userAuth,isAdmin,getAllUsers);

module.exports = router;

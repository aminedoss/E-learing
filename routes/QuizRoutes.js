const express = require("express");
const {
    createQuiz,
    GetAllQuiz, 
    UpdateQuiz, 
    DeleteQuiz
} = require("../Controllers/QuizController.js");
const {upload} = require("../middelwares/multer.js");
const {userAuth,isAdmin} = require("../middelwares/authMiddleware.js");
const router = express.Router();
router.post("/create-Quiz",userAuth,isAdmin,upload.single("icon"),createQuiz);
router.get("/All",userAuth,GetAllQuiz);
router.put("/update-Quiz",userAuth,isAdmin,upload.single("icon"),UpdateQuiz);
router.delete("/Delete-Quiz",userAuth,isAdmin,DeleteQuiz);

module.exports = router;
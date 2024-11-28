const express = require("express");
const { uploadCvController } = require("../Controllers/CvControllers.js");
const {upload} = require("../middelwares/multer.js");
const file = upload.single("file")
const router = express.Router();

router.post("/upload",file, uploadCvController);

module.exports = router;
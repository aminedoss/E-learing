const CvModel = require("../Models/CvModel.js");
const mongoose =require("mongoose");
exports.uploadCvController = async (req, res, next) => 
    {
        try {
            const { name } = req.body;
            if (!name || !req.file) {
                return res.status(400).json({ success: false, message: "Name and file are required" });
            }
            const file = req.file.path;
            const item = await CvModel.create({ name, file });
            res.status(201).json({ success: true, item });
        } catch (error) {
            next(error);
        }
    }
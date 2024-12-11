const CvModel = require("../Models/CvModel.js");
const mongoose =require("mongoose");
exports.uploadCvController = async (req, res, next) => 
    {
        try {
            const { name, email, phone, gitHub, linkedin} = req.body;
            
            if (!name || !email || !phone || !req.file){
                return res.status(400).json({ success: false, message: "Name and file are required" });
            }
            const file = req.file.path;
            const item = await CvModel.create({
                name,
                email,
                phone,
                gitHub,
                linkedin,
                file
            });
            res.status(201).json({ success: true, item });
        } catch (error) {
            next(error);
        }
    }
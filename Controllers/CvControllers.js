const CvModel = require("../Models/CvModel.js");
const mongoose =require("mongoose");
const uploadCvController = async (req, res, next) => 
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
};
const getAllCVs = async (req, res) => {
    try {
      // Récupérer tous les CV
      const cvs = await CvModel.find();
  
      // Vérifier si des CV existent
      if (!cvs || cvs.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Aucun CV trouvé.",
        });
      }
  
      // Réponse avec les CV
      res.status(200).json({
        success: true,
        count: cvs.length,
        data: cvs,
      });
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la récupération des CV:", error);
      res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des CV.",
        error: error.message,
      });
    }
  };
  module.exports = {
    getAllCVs,
    uploadCvController
  };
  
const UserModel = require("../Models/UserModel");
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); // Ne pas inclure le mot de passe dans la réponse
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
const updateUserController = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            message: "Users Updated !!!",
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
  };

module.exports = { updateUserController,getAllUsers };

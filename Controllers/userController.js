const updateUserController = async (req, res, next) => {
    const { name, email, lastName } = req.body;
    if (!name || !email || !lastName) {
        return next("Please Provide All Fields");
    }
    try {
        const user = await UserModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        const token = user.createJWT();
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

module.exports = { updateUserController };

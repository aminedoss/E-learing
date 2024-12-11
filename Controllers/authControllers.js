const User = require("../Models/UserModel");

const registerController = async function(req, res, next) {
    const { name, email, password } = req.body;
    if (!name) {
        return next("Name is required");
    }
    if (!email) {
        return next("Email is required");
    }
    if (!password || password.length < 6) {
        return next("Password is required and should be greater than 6 characters");
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return next("Email already registered. Please log in");
        }
        const user = await User.create({ name, email, password });
        //token 
        const token = user.createJWT();
        res.status(201).send({
            success: true,
            message: "User created successfully",
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};
const loginController = async function (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next("Please provide all fields");
    }
    try {
        // Trouver l'utilisateur par e-mail
        const user = await User.findOne({ email }).select("+password role"); // Utilisez `user` au lieu de redéclarer `User`.
        if (!user) {
            return next("Invalid username or password");
        }

        // Comparer le mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next("Invalid username or password");
        }

        user.password = undefined;
        const token = user.createJWT();
        
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user,
            token,
            role: user.role,
        });
    } catch (error) {
        next(error);
    }
};;
module.exports = {
    registerController,
    loginController,
};

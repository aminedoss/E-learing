const user = require("../Models/UserModel");
const JWT = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next("NO Auth");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, role: payload.role };
        next();
    } catch (error) {
        next("Auth Failed !!!!!");
    }
};
const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not Admin" });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { userAuth, isAdmin };



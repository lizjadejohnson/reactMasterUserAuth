//Create middleware to verify the JWT from the cookie for routes that require authentication:

const User = require("../models/user")

const jwt = require('jsonwebtoken');


const authenticate = async (req, res, next) => {
    console.log("Hit requireAuth() ")
    // 1. Read token off cookie
    const token = req.cookies.token;
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    // 2. Decode Token  -> jwt
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT");
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(403).json({ message: "Invalid token" });
    }
};

// Use this middleware in routes that require authentication
// router.get('/private-route', authenticate, (req, res) => {
//     res.send('This is a protected route');
// });

module.exports = authenticate;
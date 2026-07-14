const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('Access denied. No token provided.');
        error.status = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.isAdmin) {
            const error = new Error('Forbidden. Admin permissions required.');
            error.status = 403;
            return next(error);
        }

        req.user = decoded;
        next();
    }catch (err){
        const error = new Error('Invalid or expired token.');
        error.status = 401;
        return next(error);
    }
};

module.exports = { verifyAdminToken };
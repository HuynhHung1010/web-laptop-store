import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },

        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

// export const isAuth = (req, res, next) => {
//     const authorization = req.headers.authorization;
//     if (authorization) {
//         const token = authorization.split("")[1];
//         jwt.verify(token, precess.env.JWT_SECRET || 'somethingsecret',
//             (err, decoded) => {
//                 if (err) {
//                     req.status(401).send({ message: "Invalid token" })
//                 } else {
//                     req.user = decoded
//                 }
//             }
//         );
//     }
// };

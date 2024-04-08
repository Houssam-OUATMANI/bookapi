import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')
        const decodedToken = jwt.verify(token[1], process.env.JWT_SECRET_KEY)
        const _id = decodedToken.sub._id
        console.log(decodedToken)

        
        if (req.body._id && req.body._id !== _id) {
            return res.status(401).json({message : "Unauthorized"})
        
        }
        else {
            next()
        }
    }
    catch (err) {
        console.error(err)
    }
}
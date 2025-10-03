import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
    const token = req.cookies['auth_token']

    console.log('token', token)
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.sub
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
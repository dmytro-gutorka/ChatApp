import jwt from "jsonwebtoken";

export default function setAuthCookie(res, payload) {
    console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('auth_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? process.env.PROD_DOMAIN : undefined,
        maxAge: 7 * 24 * 3600 * 1000,
    });
}
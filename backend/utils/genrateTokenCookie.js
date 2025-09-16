import jwt from 'jsonwebtoken'

export const genrateTokenCookie = (userId) => {
     const token = jwt.sign({userId} , process.env.JWT_SECRET_KEY , {
        expiresIn: "7d"
     })

     return token;

}
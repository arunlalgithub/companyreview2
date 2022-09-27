require('dotenv').config();
const Jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
//const jwtKey = 'e-com';
const expiry = process.env.ACCESS_TOKEN_EXPIRY_TIME;


//Middleware for token authetication
const verifyToken = ((req, resp, next) => {
  console.log("Verify token call******:")
  //let token = req.headers['authentication']
     const cookies = req.headers.cookie;
    //const cookies = req.headers.Set_Cookie;
    console.log('*** c :', cookies)
    const token = cookies.split("=")[1];
    console.warn("Middleware called", token)
  if (token) {
    //token = token.split(' ')[1];
    //console.log("Middleware Called if :", token)
    Jwt.verify(token, JWT_SECRET_KEY , (error, user) => {
      if (error) {
        resp.status(401).send("Result: Please provide valid token")
      } else {
        console.log('user id ** :',user.id)
        req.id=user.id
        req.role=user.role
        console.log('**** next call')
        next()
      }
    })
  } else {
    resp.status(403).send("Result: Please add token with header")
  }
})

module.exports = {
  verifyToken
}

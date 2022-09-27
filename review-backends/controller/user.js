require('dotenv').config();
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const User = require('../model/user_schema');
//const jwtKey = 'e-com';
const jwtKey = process.env.ACCESS_TOKEN_SECRET;
const expiry = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))



const createUser = async (req, resp) => {
    let user = new User(req.body);
    const email = user.email
    const filePath = `/uploads/${req.file.filename}`;
    console.log('filePath', filePath);
    console.log('filePath', __dirname);
    user.profilepic = filePath

    try {
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return resp.status(400).json({ status: 400, error: "Email already exit" });
        }
        let result = await user.save();
        result = result.toObject();
        delete result.password
        //resp.send(result);
        Jwt.sign({ result }, jwtKey, { expiresIn: expiry }, (err, token) => {
            if (err) {
                resp.send({ result: "Something went wrong Please try after some time" })
            }
            resp.send({ result, auth: token })
        })
    } catch (err) {
        console.log(err)
    }
    
}   

 
const Login = async (req, resp) => {
    console.log('login call....1')
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            console.log('login call....2')

           const token = Jwt.sign({ id : user._id , role : user.role }, jwtKey, { 
                     expiresIn: "5h" })
              
                console.log('login call....4')
                resp.cookie( 'access_token', token, {
                    // path :'/',
                    expires : new Date(Date.now() + 7 * 24 *3600000),
                    httpOnly : true,
                    sameSite : 'lax'
                })
                //resp.send({ user, auth: token })
               console.log('login call....5')
                return resp
                .status(200)
                .json({ medssage : "Succesfully Logged In", user : user, token})
               //  resp.send(user, token)
             }
        } else {
            resp.send({ result: "No User Found" })
        }
    }
    //resp.send(req.body)


//@desc  Logout controller to clear cookie and token
const logout = async (req, res) => {
    // Set token to none and expire after 1 seconds
    console.log('** Logout call')
     res.clearCookie("access_token").clearCookie("cookie_auth").clearCookie("631a294a5b8908663be428ce")
   .status(200)
        .json({ success: true, message: 'User logged out successfully' })
 
    res.end()
}


const resetUserPassword = async (req, res) => {
    console.log(req.body.email)
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    console.log('user not found')
                    return res.status(422).json({ error: "User don't exist with that email" })
                }
                console.log('user  found**', user)
                user.resetToken = token,
                    user.expireToken = Date.now() + 3600000
                user.save()
                    .then((user) => {
                        transporter.sendMail({
                            to: user.email,
                            from: "techassignment7@gmail.com",
                            subject: "Password Reset ",
                            html: `
                <p> You requested for password reset </p>
                <h5>click in this <a href="http://localhost:3000/reset/${token}"> link </a> to reset password  </h5>
            `
                        })
                        res.json({ message: "Check your email" })
                    })

            })
    })
}


const addNewPassword = async (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken })
        .then(user => {
            if (!user) {
                console.log('!!!!user not found ')
                return res.status(422).json({ error: "Try again session expire" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = newPassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "Password updated successfully" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
}


const refreshToken =(req,res,next) =>{
    const cookies = req.headers.cookie;
    console.log('*** c :', cookies)
    const prevToken = cookies.split("=")[1];
    if(!prevToken){
        return res.status(400).json({message : "Couldn't fid toekn"})
    }
    
    Jwt.verify(token, JWT_SECRET_KEY , (error, user) => {
        if (error) {
          resp.status(401).send("Result: Authentication failed")
        } else {
          console.log('user id ** :',user.id)
          req.id=user.id
          next()
        }
      })
      res.clearCookie(`${user.id}`)
      res.cookie[`${user.id}`] =" "

      const token = jwt.sing({id: user._id}, jwtKey, {
        expiresIn : "5h"
      })
      res.cookie(String(user.id), token, {
        path :'/',
        expires : new Date(Date.now() + 7 * 24 *3600000),
        httpOnly : true,
        sameSite : 'lax'
    })

    req.id = user.id
    next()
}

module.exports = {
    createUser,
    Login,
    resetUserPassword,
    addNewPassword,
    refreshToken,
    logout,
}

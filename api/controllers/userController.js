const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { z } = require('zod')


const salt = bcrypt.genSaltSync(10)
const secret = process.env.SECRET

const validationSchema = z.object({
    email: z.string().email()
})

const loginUser = async (req, res) => {


    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        // console.log(user)
        const passOk = bcrypt.compareSync(password, user.password)
        if (passOk) {
            jwt.sign({ email, id: user._id }, secret, (err, token) => {
                if (err) throw err
                res.cookie("token", token,{
                    sameSite: 'None',
                    secure: true, // Ensure your site uses HTTPS
                    httpOnly: true, // Optional, but good for security
                  }).json(user);
            })
        }
        else{
            res.status(403).json("Invalid password!!!");
        }


    } catch (e) {
        // console.log(e)
        res.status(400).json(e)
    }

}
// {
//     sameSite :"None",
//     secure : true,
//     httpOnly:true
// }

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const ifExists = await userModel.find({ email })
        console.log(ifExists.length)
        if (ifExists.length > 0)
            res.status(403).json("Email already exists!!!");
        else {
            const user = await userModel.create({
                name,
                email,
                password: bcrypt.hashSync(password, salt)
            })
            // console.log(user)
            jwt.sign({ email, id: user._id }, secret, (err, token) => {
                if (err) throw err
                res.cookie("token", token,{
                    sameSite: 'None',
                    secure: true, // Ensure your site uses HTTPS
                    httpOnly: true, // Optional, but good for security
                  }).json(user);
            })
        }



    } catch (e) {
        // console.log(e)
        res.status(400).json(e)

    }
}

const userLogout = async (req, res) => {
    res.cookie('token', '').json('ok');
}


const adminLogin = async (req, res) => {


}

module.exports = { loginUser, registerUser, userLogout, adminLogin }
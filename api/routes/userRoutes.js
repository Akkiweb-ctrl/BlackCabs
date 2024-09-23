const express = require("express");
const {loginUser,registerUser,userLogout,adminLogin} = require('../controllers/userController')

const userRouter = express.Router();
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminLogin);
userRouter.post('/logout',userLogout);



module.exports= userRouter

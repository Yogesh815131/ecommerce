import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {sample_users} from '../data';
import {User, UserModel} from '../models/user.model';
import {HTTP_BAD_REQUEST} from '../constants/http_status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.get("/insertUsers", asyncHandler(async(req, res)=>{
    const userCount = await UserModel.countDocuments();

    if(userCount > 0){
        res.send("User Already Inserted");
        return;
    }
    
    await UserModel.create(sample_users);
    res.send("User Inserted Successfully")

}))

router.post("/register", asyncHandler(async(req, res)=>{
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.status(HTTP_BAD_REQUEST).send("You have already registered, Please Login")
        return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);
    const newUser:User = {
        name:name,
        email:email,
        password:encryptPassword,
        address:address,
        isAdmin:false
    }

    const insertUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(insertUser));
}))

const generateTokenResponse = (user: User)=>{
    const token = jwt.sign({email:user.email, isAdmin:user.isAdmin}, "I_am_an_angular_student", { expiresIn:"2h" });
    return {
        email: user.email,
        name:user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token:token
    };
}

router.post("/login", asyncHandler(async(req, res)=>{
    const { email, password } = req.body;
    const user = await UserModel.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        res.send(generateTokenResponseLogin(user));
    }else{
        res.status(HTTP_BAD_REQUEST).send("UserName or Password is invaild!");
    }
}));


const generateTokenResponseLogin = (user:any) =>{
    const token = jwt.sign({ id : user._id, email : user.email, isAdmin: user.isAdmin }, "I_am_an_new_angular_student", {expiresIn : "2h"});

    return {
        id: user._id,
        email: user.email,
        name:user.name,
        address:user.address,
        isAdmin:user.isAdmin,
        token:token
    };
}


export default  router;
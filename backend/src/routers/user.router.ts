import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {sample_users} from '../data';
import {UserModel} from '../models/user.model';

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

export default  router;
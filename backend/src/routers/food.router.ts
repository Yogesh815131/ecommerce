import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {sample_foods,sample_tags} from '../data';
import {FoodModel} from '../models/food.model';

const router = Router();


router.get("/insertfoods", asyncHandler(
    async(req, res)=>{
        const foodCount = await FoodModel.countDocuments();

    if(foodCount > 0){
        res.send("Food Already Inserted");
        return;
    }

    await FoodModel.create(sample_foods);
    res.send("Food Inserted Successfully");
}));



export default router;
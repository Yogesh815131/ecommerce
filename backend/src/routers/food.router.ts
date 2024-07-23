import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {sample_foods,sample_tags} from '../data';
import {FoodModel} from '../models/food.model';

const router = Router();

// Insert All Foods
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

router.get("/", asyncHandler(async(req, res)=>{
    const foods = await FoodModel.find();
    res.send(foods);
}))

// To retrieve all the foods in the mangodb database
router.get("/search/:searchterm", asyncHandler(async(req, res)=>{
    const searchRegEx = new RegExp(req.params.searchterm, 'i');
    const foods = await FoodModel.find({name : {$regex:searchRegEx}});
    res.send(foods)
}));

// To retrieve all individual tags with their count
router.get("/tags", asyncHandler(async(req, res)=>{
    const tags = await FoodModel.aggregate([
        {$unwind:'$tags'},
        {
            $group:{
                _id: '$tags',
                count: {$sum: 1}
            }
        },
        {
			$project:{
				_id:0,
				name:'$_id',
				count:'$count'
			}
		}
    ]).sort({count:-1});
    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all);
    res.send(tags)
}));

//To retrieve the foods from the mongodb database depends upon user clicked tags
router.get("/tag/:tagName", asyncHandler(async(req, res)=>{
    const foods = await FoodModel.find({tags:req.params.tagName});
    res.send(foods)
}));

// To retrieve the foods from the mongodb database depends upon user clicked food(user choosen food)
router.get("/:foodid", asyncHandler(async(req, res)=>{
    const food = await FoodModel.findById(req.params.foodid);
    res.send(food)
}));

export default router;
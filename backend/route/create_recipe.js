const express = require("express");
const router = express.Router();
const recipe = require("../models/Recipes");
// router.use(express.json());



router.post('/', async (req, res)=>{
    try{
        console.log(req.body)
        const recipe_data = await recipe.create({
            title:req.body.title,
            author:req.body.author,
            ingredients:req.body.ingredients,
            directions:req.body.directions,
            user:req.user
        });
        res.json({
            status:"Success",
            message:"recipe created successfully",
            recipe_data
        })
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports = router
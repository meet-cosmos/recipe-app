const express = require("express");
const router = express.Router();
const recipe = require("../models/Recipes");

router.get('/', async (req, res)=>{
    try{
        const find_recipe = await recipe.find({});
        if(find_recipe){
            res.json({
                status:"Success",
                message:"data received",
                find_recipe
            })
        }
        else{
            res.json({
                status:"Failed",
                message:"No Data Found"
            })
        }
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

router.get('/:title', async (req, res)=>{
    try{
        const find_recipe = await recipe.find({title:req.params.title});
        if(find_recipe){
            res.json({
                status:"Success",
                message:"data received",
                find_recipe
            })
        }
        else{
            res.json({
                status:"Failed",
                message:"No Data Found"
            })
        }
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports = router
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const AddRecipe = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [direction, setDirection] = useState("");

    const AddRecipeData = async ()=>{
        const resp = await fetch("http://localhost:8088/recipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                author,
                ingredients,
                direction
            })
        })
        const data = await resp.json();
        console.log(data);
        if(data.recipe_data){
            navigate('/get_recipes')
        }
    }
    return (
        <section>
            <div>
                <h1>Create a recipe</h1>
                <div>
                    <div>
                        <h3>Recipe title</h3>
                    </div>
                    <input type="text" id="title" onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <h3>Author</h3>
                    </div>
                    <input type="text" id="author" onChange={(e)=>setAuthor(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <h3>Ingredients</h3>
                    </div>
                    <input type="text" id="ingredients" onChange={(e)=>setIngredients(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <h3>Recipe direction</h3>
                    </div>
                    <input type="text" id="directions" onChange={(e)=>setDirection(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" onClick={AddRecipeData}>Add Recipe</button>
                </div>
            </div>
        </section>
    )
}

export default AddRecipe;
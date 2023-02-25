import SignUp from "./registration"
import Login from "./login";
import AddRecipe from "./add_recipe";
import Landing from "./landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = ()=>{
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/registration" element={<SignUp/>}></Route>
            <Route path="/add" element={<AddRecipe/>}></Route>
            <Route path="/get_recipes" element={<Landing/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;
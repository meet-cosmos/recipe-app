import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ()=>{
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [response, setResponse] = useState([]);
    const HandleLogin = async ()=>{
        const resp = await fetch("http://localhost:8088/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await resp.json();
        console.log(data);
        if(data.token){
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            navigate('/get_recipes')
            alert("login successful")
        }
        console.log(response);
        setResponse(data)
    }
    return(
        <section>
            <div>
                <h1>Sign In</h1>
                <div>
                    <div>
                       <h3> Email address </h3>
                    </div>
                    <input type="text" id="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <h3>Password</h3>
                    </div>
                    <input type="password" id="password" placeholder="Enter password" onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                <br />
                {response.message ? <div style={{ color: "red" }}>{response.message}</div> : null}
                <div>
                    <button type="submit" onClick={HandleLogin}>Submit</button>
                </div>
                <br />
                <Link to='/registration'><button id="sign-upp" >Sign Up</button></Link>
            </div>
        </section>
    )
}

export default Login
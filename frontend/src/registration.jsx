import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const SignUp = ()=>{
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setCpass] = useState("");
    const [response, setResponse] = useState([]);
    const [err, setErr] = useState({password:{isValid:true, message:""}, cpass:{isValid:true, message:""}})
    const HandleSignup = async (event)=>{
        event.preventDefault()
        setEmail("")
        setPassword("")
        setCpass("");

        const resp = await fetch("http://localhost:8088/api/register", {
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
        console.log(data.data);
        setResponse(data)
        if(data.data){
            navigate('/')
            alert("registration successfull")
        }
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);
      };

    const checkErrors = (type)=>{
        switch (type){
            case "pass":
                break;
            case "cpass":
                if(password !== cpass){
                    setErr({...err, cpass:{isValid:false, message:"Confirm Password not matching"}})
                }
                else{
                    setErr({...err, cpass:{isValid:true, message:""}})
                }
                break;
        }
    }
    return(
        <>
        <section>
            <div>
                <h1>SIGN UP</h1>
                <div>
                    <input type="email" id="email" placeholder="EMAIL" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <br />
                <div>
                    <input type="password" id="password" placeholder="PASSWORD" onChange={(e)=>setPassword(e.target.value)} onBlur={(event)=>checkErrors("pass")}/>
                </div>
                <br />
                <div>
                    <input type="password" id="cpassword" placeholder="REPEAT PASSWORD" onChange={(e)=>setCpass(e.target.value)} onBlur={(event)=>checkErrors("cpass")}/>
                    {err.cpass.message ? <div style={{color:"red"}}>{err.cpass.message}</div> : null}
                </div>
                <br />
                <div>
                    <input type="checkbox" name="" checked={isChecked} onChange={handleOnChange} /><span>I agree to terms and conditions</span>
                </div>
                <br />
                <div>
                    <button type="submit" disabled={err.cpass.message.length !== 0 || !isChecked ? true : false} onClick={HandleSignup}>Continue</button>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUp;
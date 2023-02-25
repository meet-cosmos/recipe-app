import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./landing.css"
const Landing = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const fetchData = async () => {
        const resp = await fetch("http://localhost:8088/recipe", {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then((res) => {
            return res.json();
        }).then((final) => {
            setData(final.find_recipe)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)

    const HandleLogout = () => {
        localStorage.removeItem("jwt");
        window.location.reload();
    }

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            navigate('/')
        }
    }, [])

    let arr2 = []
    if (data.length !== 0 && search.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            let letter = data[i].title
            let flag = "true"
            for (let j = 0; j < search.length; j++) {
                if (search[j] !== letter[j]) {
                    flag = "false"
                    break
                }
            }
            if (flag === "true") {
                arr2.push(data[i])
            }
        }

    } else {
        arr2 = data
    }
    console.log(arr2);

    return (
        <div>
            <h3>Check Recipes</h3>
            <div>
                <div>
                    <input type="text" placeholder="search by title" id="search" onChange={(e) => setSearch(e.target.value)} />
                </div>
                <br />
                <Link to="/add"> <button>Add recipe</button> </Link>
            </div>
            <br />
            <div id="value-div">
                {arr2.map((values, index) => {
                    return (
                        <div key={index} id="title-div">
                            <div id="title">{values.title}</div>
                        </div>
                    )

                })}
            </div>
            <br />
            <div>
                <button type="submit" onClick={HandleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Landing;
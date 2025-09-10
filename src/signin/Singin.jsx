import { useNavigate } from "react-router-dom"
import Field from "../Field/Field.jsx"
import style from "../signup/css/signup.module.css"
const Signin = (props) =>{

    const url = "http://localhost:8080/auth"

    const nav = useNavigate()

    const  handelSubmit = async (e) =>{
        e.preventDefault();

        let user = {
            username: e.target[0].value,
            password: e.target[1].value
        }

        const req = new Request(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type' : 'application/json',
            },
            body: JSON.stringify(user),
            credentials: "include"
        })
        let saved_user = await fetch(req)
            .then((res) => {
                if (res.ok) {
                    console.log(res.headers.getSetCookie())
                    console.log("user fetched")
                    return res.json()
                } else {
                    // console.log("user not fetched")
                    throw new Error("user not fetched")
                }
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem("jwtToken", data.token)
                setTimeout(() => {
                    nav("/chatList")
                }, 3000); // Wait for 3 seconds before navigating
            })
            .catch((err) => {
                console.log(err)
            })


            

        

    }

    return <>
    
    <div className={style.back}>
            <h1 className={style.head}>Singin</h1>
            <form onSubmit={handelSubmit}>
               
               {/* ? <Field name="last-name" type="text" message="last name"/> */}
                <Field name="username" type="text" message="username" />
                <Field name="password" type="password" message="password"/>
                {/* <Field name="password" type="password" message="repeat password"/> */}
                <input type="submit" className={style.submit} />

            </form>
        </div>
    </>
}


export default Signin;
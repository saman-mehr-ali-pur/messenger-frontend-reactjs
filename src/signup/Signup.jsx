
import style from "./css/signup.module.css"
import Field from "../Field/Field.jsx"
import { redirect, useNavigate } from "react-router-dom"
const Signup = ()=>{

    const url = "http://localhost:8080/user/save"
    const navigate = useNavigate();



    const handleUsernameChange = (e)=>{
        const username = e.target.value;
        fetch(`http://localhost:8080/user/user/check_username/${username}`).then((res)=>{    
            if (res.status==304){
                console.log("username is available")
                return true
            }
            else{
                alert("username is not available")
                return false
            }
        }
    }

    const handelSubmit = (e)=>{
        e.preventDefault();
        if (e.target[4].value.length < 3){
            alert("passwords is too short")
            return
        }

        if (e.target[4].value !== e.target[5].value){
            alert("passwords do not match")
            return
        }
        if (e.target[2].value.length < 3){
            alert("username is too short")
            return
        }

        if (!checkAction(e.target[3].value) ){
            return 
        }
      

        let newUser = {
            fName: e.target[0].value,
            lName: e.target[1].value,
            username: e.target[2].value,
            email: e.target[3].value,
            password: e.target[4].value,
        }
        
        const req = new Request(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        let saved_user = fetch(req)
            .then((res) => {
                if (res.ok) {
                    alert("user created")
                
                    return res.json()
                } else {
                    alert("user not created")
                    throw new Error("user not created")
                }
            })
            .then((data) => {
                console.log(data)
                navigate("/")

            })
            .catch((err) => {
                console.log(err)
            })

            
            

            
    }

    return <>
        <div className={style.back}>
            <h1 className={style.head}>singup</h1>
            <form onSubmit={handelSubmit}>
                <Field name="fist-name" type="text" message="fist name"/>
                <Field name="last-name" type="text" message="last name"/>
                <Field name="username" type="text" message="username" checkAction={checkAction} />
                <Field name="email" type="email" message="email"/>
                <Field name="password" type="password" message="password"/>
                <Field name="password" type="password" message="repeat password"/>
                <input type="submit" className={style.submit}/>

            </form>
        </div>
    </>
    
}





export default Signup;
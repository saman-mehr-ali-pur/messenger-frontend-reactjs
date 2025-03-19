
import style from "./css/signup.module.css"
import Field from "../Field/Field.jsx"
const Signup = ()=>{


    const handelSubmit = (e)=>{
        e.preventDefault();
        console.log(e.target[0].value)
    }

    return <>
        <div className={style.back}>
            <h1 className={style.head}>singup</h1>
            <form onSubmit={handelSubmit}>
                <Field name="fist-name" type="text" message="fist name"/>
                <Field name="last-name" type="text" message="last name"/>
                <Field name="username" type="text" message="username" />
                <Field name="password" type="password" message="password"/>
                <Field name="password" type="password" message="repeat password"/>
                <input type="submit" className={style.submit}/>

            </form>
        </div>
    </>
    
}



export default Signup;
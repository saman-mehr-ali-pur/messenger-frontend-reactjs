import Field from "../Field/Field.jsx"
import style from "../signup/css/signup.module.css"
const Signin = (props) =>{

    const handelSubmit = (e) =>{
        e.preventDefault();

    }

    return <>
    
    <div className={style.back}>
            <h1 className={style.head}>Singin</h1>
            <form onSubmit={handelSubmit}>
               
               {/* ? <Field name="last-name" type="text" message="last name"/> */}
                <Field name="username" type="text" message="username" />
                <Field name="password" type="password" message="password"/>
                {/* <Field name="password" type="password" message="repeat password"/> */}
                <input type="submit" className={style.submit}/>

            </form>
        </div>
    </>
}


export default Signin;
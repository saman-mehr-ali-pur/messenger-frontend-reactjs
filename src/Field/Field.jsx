import style from "../signup/css/signup.module.css"
const Field = (props) =>{

    return <>
        <label htmlFor={props.name} className={style.label}>{props.message}</label>
        <input type={props.type}  name={props.name} className={style.input} />
    </>
}


export default Field;
import { Link, Outlet } from "react-router-dom"
import style from "./css/home.module.css"

const Home = ()=>{
    return <>
    
        <div className={style.div}>
            <p className={style.paragraph}>this my own messenger</p>
        </div>

        <Outlet/>

        <div className={style.div}><p className={style.p}>if you dont have account <Link className={style.link} to="/signup"> signup</Link></p></div>
    
    </>
}

export default Home;
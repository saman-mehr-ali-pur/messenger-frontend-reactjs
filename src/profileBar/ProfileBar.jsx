import profile from "../assets/avatar.svg"
import style from "./css/profile.module.css"
const ProfileBar = (props) =>{

    return <>
        <div className={style.bar}>
            <div className={style.img_container}><img src={profile} alt="profile" className={style.img}/></div>
            <div className={style.username_bar}><p>username</p></div>
        </div>
    </>
}


export default ProfileBar;
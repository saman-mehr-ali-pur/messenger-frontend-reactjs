import PropTypes from "prop-types";
import profile from "../assets/avatar.svg"
import style from "./css/profile.module.css"

const ProfileBar = (props) =>{

    return <>
        <div className={style.bar}>
            <div className={style.img_container}>
                <img
                    src={props.avatar && props.avatar.length > 0 ? props.avatar[0] : profile}
                    alt="profile"
                    className={style.img}
                />
            </div>
            <div className={style.username_bar}>
                <p>{props.username}</p>
            </div>
        </div>
    </>
}

ProfileBar.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.arrayOf(PropTypes.string)
};

ProfileBar.defaultProps = {
    avatar: []
};

export default ProfileBar;
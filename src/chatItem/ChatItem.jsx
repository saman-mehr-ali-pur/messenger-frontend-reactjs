import icon from "../assets/avatar.svg"
import style from "./css/chatItem.module.css"
const ChatItem = (props) =>{


    return <>

        <div className={style.item}>
            
            <img src={icon} alt="icon"  className={style.profile} />
            <p>{props.name}</p>
        </div>
    </>
}

export default ChatItem;
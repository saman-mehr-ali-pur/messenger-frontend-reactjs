import style from "./css/mainPage.module.css"
import ChatItem from "../chatItem/ChatItem";
const ListChat = (props) =>{


    return <>
    
        <div className={style.frame}>
            <div className={style.chatList}>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>

            </div>
            {/* <div className={style.chatList}><ChatItem/></div> */}

            <div className={style.div} ><p>chat</p></div>
        </div>

    </>
}


export default ListChat;
import style from './css/chat.module.css'
const Chat = (props)=>{

    const message ={ id: 1, text: 'Hey, how are you today?', type: 'received', time: '10:30 AM' }
    
    // console.log(props.time)

    const rightClick = (event)=>{
      props.selectedMessage.current = props.id;
      props.handleMenuContextClick(event)
    }
    
    return <>
    
        
        <div key={message.id} className={props.type=="received" ? style.message_received :style.message_sent} onContextMenu={rightClick}>
          <div className="message-content" style={{fontFamily:"Noto Sans",fontSize:"18px"}}>
            {props.text}
            <div className="timestamp" style={{fontSize:"15px"}}>{props.time}</div>
            </div>
    
    </div>
    </>
}


export default Chat;
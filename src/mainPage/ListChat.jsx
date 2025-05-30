import style from "./css/mainPage.module.css"
import ChatItem from "../chatItem/ChatItem";
import Chat from "../chat/Chat.jsx"
import ProfileBar from "../profileBar/ProfileBar.jsx";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import formatTimeToHHMM from "../util/getTime.js";
import ContextMenu from "../contexMenu/ContexMenu.jsx";
import sendIcon from "../assets/send.png"
const ListChat = (props) =>{

    const serverUrl = "http://localhost:8080"
    const [input , setInput] = useState("");
    const [chats,setChats] = useState([]); // for chat rooms
    const [chatRooms,setChatRooms] = useState([]);
    const [messages, setMessages] = useState([]); // for unseen messages
    const [client , setClient]  = useState(null);
    const [contacts,setContacts] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); 
    const selectedMessage = useRef(0)
    const [isEdit, setIsEdit] = useState(false)

    const handleInput = (e) => {
      // console.log(e)
      setInput(e.target.value)
    }

    const handleKeyDown = (e)=>{
      if(e.key=="Enter" && !isEdit){
        console.log(isEdit)
        sendMessage(input)

      }
      else if(e.key=="Enter" && isEdit){
        console.log("set false ")
        setIsEdit(false)
        editMessage(selectedMessage.current,input)
        setInput('')
      }

    }

    const handelRightClick = (event) => {
      console.log(event)
      event.preventDefault();
      setIsMenuVisible(true);
      setMenuPosition({ x: event.pageX, y: event.pageY });
      // console.log(event.pageX, event.pageY)
  }

  const handelOutsideClick = (event) => {
    event.preventDefault();
      setIsMenuVisible(false);
    }
    useEffect(()=>{

      const fetchRooms = async () => {
        const request = new Request(`${serverUrl}/room/all_rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
          },
          body: JSON.stringify({ userId: 1 }),
          credentials: 'include',
        });
    
        try {
          const resp = await fetch(request);
          if (resp.ok) {
            const rooms = await resp.json();
            setChatRooms(rooms); // Assuming you want to store the rooms
          } else {
            throw new Error(`Something went wrong: ${resp.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchRooms();

      
      // Fetch unseen messages   
        const stompClient = new Client({
          brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000, 
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders:{
               Authorization: localStorage.getItem("jwtToken"),
               login : 1
            },
            debug: (str) => {console.log(str)}
        })


        // On connection
        stompClient.onConnect = () => {
        console.log('Connected to STOMP');
        // Subscribe to a topic
        stompClient.subscribe('/topic/chat', (message) => {
          console.log(message)
          const messageBody = JSON.parse(message.body);
          console.log(messageBody)
          // const searchMessage = messages.find((item) => item.id == messageBody.id);
          if (messageBody.status != undefined && messageBody.status == true) {
            console.log("message is already in the list")
            setMessages((prev) => prev.map((item) => item.id == messageBody.id ? messageBody : item));
          }
          else
            setMessages((prev) => [...prev, messageBody]);
        });
      };





      // On error
    stompClient.onStompError = (frame) => {
        console.error('STOMP error:', frame);
      };

    stompClient.activate();
    setClient(stompClient);

    return () => {
        if (stompClient) {
          stompClient.deactivate();
          console.log('Disconnected from STOMP');
        }
      };

    },[])



    const sendMessage = () => {
      if (client && client.connected && input) {
        let respons = client.publish({
          destination:'/app/message',
          body: JSON.stringify({ content: input }),
        });
        console.log(respons)
        setInput('');
      }
    };

    const editMessage = (id,newMessage) => {
      if (client && client.connected) {
        let req = messages.find((item) => item.id == id);
        req.message = newMessage;
        let respons = client.publish({
          destination:`/app/change`,
          body: JSON.stringify({ content: JSON.stringify(req) }),
        });
      }
      }
    


    const deleteMessage = (id) => {
      if (client && client.connected) {
        let respons = client.publish({
          destination:`/app/delete`,
          body: JSON.stringify({ content: input }),
        });
        if (respons) {
            console.log(respons)
        }
      }
    }

    return <>
    
        <div className={style.frame} onClick={handelOutsideClick}>
            {isMenuVisible && (
              <ContextMenu x={menuPosition.x}
              y={menuPosition.y} 
              id={selectedMessage}
              deleteAction={deleteMessage}
              editAction={editMessage}
              setInput={setInput}
              messages={messages}
              setIsEdit={setIsEdit}
              />)}
            <div className={style.chatList}>
                <ChatItem/>
                
                <ChatItem/>

            </div>
            
            <div className={style.chat_container}>
                <ProfileBar/>

         
            <div className={style.chatRoom}>
                {messages.map(item => <Chat key={item.id} 
                id={item.id}
                text={item.message} 
                time={formatTimeToHHMM(item.date)}
                 type="send" 
                 handleMenuContextClick={handelRightClick}
                 editMessage={editMessage}
                 deleteMessage={deleteMessage}
                 selectedMessage={selectedMessage}
                
                 ></Chat>)}

                 <div className={style.input_container}>
                 <input type="text" placeholder="message ..." className={style.input} value={input} onChange={handleInput} onKeyDown={handleKeyDown} ></input>
                  <img src={sendIcon} alt="send" className={style.sendIcon} onClick={sendMessage}></img>

                 </div>

            </div>
    
            </div>
                
        </div>

    </>
}


export default ListChat;
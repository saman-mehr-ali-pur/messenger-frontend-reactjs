import style from "./css/mainPage.module.css"
import ChatItem from "../chatItem/ChatItem";
import Chat from "../chat/Chat.jsx"
import ProfileBar from "../profileBar/ProfileBar.jsx";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import formatTimeToHHMM from "../util/getTime.js";
import ContextMenu from "../contexMenu/ContexMenu.jsx";
import sendIcon from "../assets/send.png"
import SearchBar from "./SearchBar.jsx";
import ResultSearchItem from "../resultSearch/ResultSearchItem.jsx";
import { data, useNavigate } from "react-router-dom";
import { use } from "react";
import { stringify } from "postcss";
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
    const [selectedRoom, selectRoom] = useState(null);
    const selectedRoomRef = useRef(null);
    const [resultSearch,setResultSearch] = useState(null)
    const [isFocused,setFoucsed] = useState(false)
    const [messageContex,setMessagesContex] = useState(null)
    const messageContexRef = useRef(null)
    const username = useRef(null)

    const nav = useNavigate()



    
    useEffect(()=>{

      messageContexRef.current = messageContex
    },[messageContex])

      
      useEffect(()=>{

      const fetchMessages = async () => {
        console.log("fetch messages called "+ selectedRoom.id)

        if (selectedRoom==null){
          console.log("selectromm is null")
          return;


        }
        const request = new Request(`${serverUrl}/messages-rest/get/${selectedRoom.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Authorization": localStorage.getItem("jwtToken")}              
              }
          
            );

            fetch(request)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              setMessagesContex(data);
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });

          
      }
    


      fetchMessages();
    },[selectedRoom])

    
    
useEffect(() => {
  console.log("selectedRoom changed: ", selectedRoom);
  selectedRoomRef.current = selectedRoom;
  console.log("selectedRoomRef updated: ", selectedRoomRef.current);
}, [selectedRoom]);
  
  
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

      const fetchUsername = async () => { 

        const request = new Request(`${serverUrl}/user/getUsername`, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain',
            'Accept': 'text/plain',
            "Authorization": localStorage.getItem("jwtToken")
            
          }
        });

        fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);      
            }
            
            return response.text();
    
    })
          .then(data => {
            console.log("username= "+ data);
            username.current=data;
          })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }


      fetchUsername();

      

      const fetchRooms = async () => {
        const request = new Request(`${serverUrl}/room/all_rooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": localStorage.getItem("jwtToken")
            
          },
          body: JSON.stringify({ userId: 1 }),
          // credentials: 'include',
        });
    
        
          fetch(request).then(resp => {
          if (resp.ok ) {
            return resp.json();
          } else {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
        }).then(data => {
          if(data){
          // console.log(data);
          setChatRooms(data);}
          }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
          
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
        stompClient.subscribe(`/topic/chat/${username.current}`, (message) => {
          console.log(message.body)
          let messageBody = JSON.parse(message.body);
          console.log(messageBody)

          if (messageBody.op!=undefined && messageBody.op=="delete" && messageBody.status==true){
            
            let newContext = {...messageContexRef.current};
            newContext.chats = messageContexRef.current.chats.filter((item) => item.id != messageBody.id); 
            setMessagesContex(newContext);
            console.log(messageContex)
            
          }

          if (messageBody.op!=undefined && messageBody.op=="delete" && messageBody.status==false){
            return
          }

          if (messageBody.status != undefined && messageBody.status == true) {
            
            setMessages((prev) => prev.map((item) => item.id == messageBody.id ? messageBody : item));
          }
          else{
            // console.log("selectedRoom: "+selectedRoom.id)
           
            if (selectedRoomRef.current && (messageBody.room.members[0].id == selectedRoomRef.current.id || messageBody.room.members[1].id == selectedRoomRef.current.id)){
              // console.log("new message arrived: ")
              // console.log(messageBody)
              console.log(messageContexRef.current)
              let newContext = {...messageContexRef.current};
              newContext.chats = [...messageContexRef.current.chats, messageBody]; 
              // console.log(newContext==messageContex)           
              setMessagesContex(newContext);
              console.log(messageContex)
            }
            else{
              
            setMessages((prev) => [...prev, messageBody]);
            console.log("messages: "+messages)
          }
           
          }
            
        });
      };





      // On error
    stompClient.onStompError = (frame) => {
        console.error('STOMP error:', frame);
        nav("/")
      };

    stompClient.activate();
    setClient(stompClient);

    return () => {
        if (stompClient) {
          stompClient.deactivate();
          console.log('Disconnected from STOMP');
        }
      };

    },[selectedRoom])



    const sendMessage = () => {
      console.log("send message called "+ selectedRoom.id)
      if (client && client.connected && input) {
        let respons = client.publish({
          destination:'/app/message',
          body: JSON.stringify({ content: input , chatRoomid: selectedRoom.id , owner: username.current}),
        });
        // console.log(respons)
        setInput('');
      }
    };

    const editMessage = (id,newMessage) => {
      if (client && client.connected) {
        let req = messageContexRef.current.chats.find((item) => item.id == id);
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
          body: JSON.stringify({ id: id.current ,username: username.current }),
        });
        
      }
    }


    const handeOnclickResultSearch = (item) => {
      selectRoom(item);
      setResultSearch(null);
      setFoucsed(false);
    }

    const handelChatItemClick = (item) => {
      // console.log(item.members[0].username == username.current ? item.members[1]:item.members[0]);
      selectRoom(item.members[0].username == username.current ? item.members[1]:item.members[0])
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
              messages={messageContexRef.current ? messageContexRef.current.chats : []}
              setIsEdit={setIsEdit}
              />)}
            
            <div>
              
              <SearchBar setFoucsed={setFoucsed} updateResult={setResultSearch}/>

              {isFocused && (
                <div style={{
                  position: "absolute",
                  top: "60px",
                  left: "20px",
                  width: "25%",
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  zIndex: 100,
                  padding: "8px",
                  minHeight: "40px"
                }}>
                  {resultSearch && resultSearch.length > 0 ? (
                    resultSearch.map((item,index) => {
                      // console.log("item: "+item.id)
                      return <ResultSearchItem
                        key={index}
                        avatar={item.profilePaths}
                        name={item.username}
                        description={item.description}
                        onClickHandel={() => handeOnclickResultSearch({
                          id: item.id,
                          roomName: item.username,
                          profilePaths: item.profilePaths,
                          username: item.username,
                        })}
                      />
                  })
                  ) : (
                    <div style={{ color: "#888", textAlign: "center", padding: "2%" , paddingBottom:"2%"}}>
                      Nothing found
                    </div>
                  )}
                </div>
              )}

              <div className={style.chatList}>
                {chatRooms.map(item => {
                  const otherMember = item.members.find(m => m.username !== username.current);
                  return (
                    <ChatItem
                      onClickHandel={() => handelChatItemClick(item)}
                      name={otherMember ? otherMember.username : ""}
                    />
                  );
                })}
              </div></div>
            
            
            
            {(selectedRoom!=undefined) ?  <div className={style.chat_container}>
                <ProfileBar username={selectedRoom.username} avatar={selectedRoom.profilePaths}/>

            {messageContex && messageContex.chats.length>0 ? 
            
            messageContex.chats.map(item => <Chat key={item.id} 
                id={item.id}
                text={item.message} 
                time={formatTimeToHHMM(item.date)}
                 type={item.sent==true ? "sent" : "received"} 
                 handleMenuContextClick={handelRightClick}
                 editMessage={editMessage}
                 deleteMessage={deleteMessage}
                 selectedMessage={selectedMessage}
                 />)
            
            :<></>}
            <div className={style.chatRoom}>
              
                 <div className={style.input_container}>
                 <input type="text" placeholder="message ..." className={style.input} value={input} onChange={handleInput} onKeyDown={handleKeyDown} ></input>
                  <img src={sendIcon} alt="send" className={style.sendIcon} onClick={sendMessage}></img>

                 </div>

            </div>
    
            </div>: <></> }
                
        </div>

    </>
}


export default ListChat;
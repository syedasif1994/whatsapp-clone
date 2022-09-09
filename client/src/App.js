import React, { useEffect, useState } from "react"
import './App.css';
import Sidebar from "./components/Sidebar"
import Pusher from "pusher-js"
import Chat from "./components/Chat"
import axios from "./axios"


function App() {

  // ......................... Messages ............................//

  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get("/messages/sync").then(response => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('59c6ab9f39667042dfc2', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage])
    });
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  console.log(messages)


  // ......................... ROOMS ............................//

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios.get("/rooms/sync").then(response => {
      setRooms(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('59c6ab9f39667042dfc2', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('rooms');
    channel.bind('inserted', function (newRooms) {
      setMessages([...rooms, newRooms])
    });
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [rooms])

  console.log(rooms)

  return (
    <>
      <div className="app">
        <div className="app_body">
      
            <Sidebar rooms={rooms} />
            <Chat messages={messages} />

        </div>
      </div>
    </>
  );
}

export default App;

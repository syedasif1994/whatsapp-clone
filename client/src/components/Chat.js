import React, { useState, useEffect } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@mui/material"
import axios from "../axios"
import { SearchOutlined, MoreVert, AttachFile, InsertEmoticon, Mic } from '@mui/icons-material'


function Chat({ messages }) {

  const [seed, setSeed] = useState(" ")
  const [input, setInput] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    axios.post("/messages/new", {
      message: input,
      name: " ",
      chat_time: "just now",
      chat_received: true,
    })
    setInput(" ")
  }


  return (
    <div className='Chat'>

      {/* ...........  Section 01: Chat Header  ........... */}

      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>BGMI Gaming Community</h3>
          <p>tap here for group info....</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* ...........  Section 02: Chat Body  ........... */}
      <div className="chat_body">

        <p className="chat_send">
          <span className='chat_name'>Syed Asif Imam</span>
          Hie
          <span className='chat_time'>{new Date().toDateString()}</span>
        </p>

        <p className="chat_send chat_received">
          Hello,how are you
          <span className='chat_time'>{new Date().toDateString()}</span>
        </p>

        <p className="chat_send">
          <span className='chat_name'>Syed Kashif Imam</span>
          Hie everyone
          <span className='chat_time'>{new Date().toDateString()}</span>
        </p>

        <p className="chat_send">
          <span className='chat_name'>Syed Mehdi Imam</span>
          kaise ho sab
          <span className='chat_time'>{new Date().toDateString()}</span>
        </p>

        {messages.map((info) => {
          const { id, message, name, chat_received } = info
          return <div key={id}>
            <p className={`chat_send ${chat_received && "chat_received"}`}>
              <span className='chat_name'>{name}</span>
              {message}
              <span className='chat_time'>{new Date().toDateString()}</span>
            </p>
          </div>
        })
        }

      </div>

      {/* ........... Section 03: Chat Footer  ........... */}

      <div className="chat_footer">

        <IconButton>
          <InsertEmoticon />
        </IconButton>

        <form className='chat_form'>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='chat_text' placeholder='Type a message' />
          <button type="submit" className='chat_btn' onClick={sendMessage}> Send </button>
        </form>

        <IconButton>
          <Mic />
        </IconButton>
      </div>

      {/* ........... Section End  ........... */}

    </div>
  )
}

export default Chat
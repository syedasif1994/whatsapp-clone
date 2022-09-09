import React, { useState, useEffect } from 'react'
import "./SidebarChats.css"
import { Avatar } from "@mui/material"

function SidebarChats({ id, roomname }) {

    const [seed, setSeed] = useState(" ")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return !roomname ? (
        <div className="SidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="SidebarChat_info">
                <h2>BGMI Gaming Community</h2>
            </div>
        </div>
    ) : (
        <div key={id} className="SidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="SidebarChat_info">
                <h2>{roomname}</h2>
            </div>
        </div>
    )
}

export default SidebarChats
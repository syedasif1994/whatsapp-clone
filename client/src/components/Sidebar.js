import React from 'react'
import "./Sidebar.css"
import { Avatar, IconButton } from "@mui/material"
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@mui/icons-material'
import SidebarChat from "./SidebarChats"



function Sidebar({ rooms }) {


    return (
        <div className="sidebar">

            {/* ...........  Section 01: Sidebar Header  ........... */}

            <div className="sidebar_header">
                <Avatar />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* ...........  Section 02: Sidebar Search  ........... */}

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or New Chat' />
                </div>
            </div>

            {/* ...........  Section 03: Sidebar Chats  ........... */}

            <div className="sidebar_chats">
               <SidebarChat />
             {rooms.map((room) => {
                    return (
                        <>
                            <SidebarChat {...room} />
                        </>
                    )
                })
                }
            </div>

            {/* ........... Section End  ........... */}

        </div>
    )
}

export default Sidebar;
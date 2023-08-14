import { List } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {IMessage} from "../../types";
import {fetchAllMessages, getMessage} from "../../redux/slices/messageSlice";
import EmptyTable from "../EmptyTable/EmptyTable";
import socket from "../../socket";
// @ts-ignore
import logo from '../../assets/noMsg.svg'



const ChatWindow = () => {
    const dispatch = useAppDispatch();
    const msgList = useAppSelector(state => state.messages.messages);
    const tagList = useAppSelector(state => state.tags.tags);

    const [msg, setMsg] = useState<IMessage[]>([]);

    useEffect(() => {
        const selectedTags = tagList.filter(tag => tag.isSelect);

        if (selectedTags.length > 0) {
            let filteredMessages = msgList.filter(message =>
                message.tag === null || selectedTags.some(tag => tag.tag === message.tag)
            );

            filteredMessages.sort((a, b) => a.id - b.id);

            setMsg(filteredMessages);
        } else {
            setMsg(msgList);
        }

    }, [tagList, msgList]);



    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected.')

        })

        socket.on('getMessage', (config) => {
            dispatch(getMessage(config))
        })

        dispatch(fetchAllMessages())
    }, [])

    return (
        <List
            sx={{
                flex: "1 1 auto",
                overflowY: "auto",
                padding: "50px",
                "&::-webkit-scrollbar": {
                    width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                    bgcolor: "#4F515C",
                    borderRadius: "3px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    bgcolor: "#5051F9",
                },
            }}
        >
            {msg.length === 0 ? (
                <EmptyTable
                    logoSrc={logo}
                    primaryText="No Message"
                    secondText="You have no active chats"
                />
            ) : (
                msg.map((message, index) => (
                    <ChatMessage key={index} message={message} index={index} />
                ))
            )}
        </List>
    );

}

export default ChatWindow;

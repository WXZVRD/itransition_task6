import { ListItem, ListItemText, Typography } from "@mui/material";
import React, { FC } from "react";
import { IMessage } from "../../types";

interface IChatMessage {
    message: IMessage;
    index: number;
}



const ChatMessage: FC<IChatMessage> = ({ message, index }) => {
    return (
        <ListItem key={index}>
            <ListItemText sx={{p: '12px 23px 12px 12px',
                    maxWidth: '90%',
                    borderRadius: '0px 12px 12px 12px',
                    margin: '8px 0',
                    bgcolor: '#1E1F25',
                    color: '#F5F5F5',
                    flex: 'none',
                    fontWeight: 500,
                    fontSize: '14px',}}
                          primary={<div style={{wordWrap: 'break-word'}}>
                                  {message.message}
                              </div>}
                secondary={
                    <React.Fragment>
                        <Typography sx={{display: 'inline', color: '#768396',}}
                            component="span"
                            variant="body2">
                            {message.tag ? <span key={index}>#{message.tag}</span> : ''}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default ChatMessage;

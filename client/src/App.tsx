import React, { useState } from 'react';
import {
    Box,
    List,
    Paper,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    TextField,
    IconButton,
    Autocomplete
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import TagsPanel from "./components/TagsPanel/TagsPanel";
import ReactTags from 'react-tag-autocomplete';
import ChatInput from "./components/ChatInput/ChatInput";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {


    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100vh' }}>
            <TagsPanel/>
            <Box sx={{minWidth:'400px', width: '100%', height: '100%' }}>
                <Paper sx={{ bgcolor: '#131517', borderRadius: '0px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', }}>
                    <ChatWindow/>
                    <Divider />
                    <ChatInput/>
                </Paper>
            </Box>
        </Box>
    );
}

export default App;

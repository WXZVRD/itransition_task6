import * as React from 'react';
import { Autocomplete, Box, IconButton, TextField, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { sendMessage, setTag, setMessage } from "../../redux/slices/messageSlice";
import { addTags } from "../../redux/slices/tagSlice";
import socket from "../../socket";


const ChatInput = () => {
    const dispatch = useAppDispatch();
    const config = useAppSelector(state => state.messages.config);
    const tags = useAppSelector(state => state.tags.tags);
    const [tagValue, setTagValue] = React.useState<string | null>(null);

    const sendMsg = () => {
        if (config.tag) {
            addTags(config.tag);
        }
        socket.emit('sendMessage', config)
        dispatch(sendMessage(config))
        dispatch(addTags(config.tag))
    };

    const handleTagChange = (event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
        if (newValue) {
            setTagValue(newValue);
            dispatch(setTag(newValue));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMsg();
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        sendMsg()
    };

    const autocompleteOptions = tags.map(el => el.tag);

    return (
        <form onSubmit={handleFormSubmit}>
            <Box p='24px 50px' display="flex" sx={{ bgcolor: '#282932', border: 'none' }}>
                <Autocomplete
                    freeSolo
                    disablePortal
                    options={autocompleteOptions}
                    value={tagValue}
                    onChange={handleTagChange}
                    inputValue={config.tag || ''}
                    onInputChange={(_, newInputValue) => {
                        dispatch(setTag(newInputValue));
                    }}
                    sx={{ width: 200, mr: '30px' }}
                    PaperComponent={({ children }) => (
                        <Paper style={{
                            backgroundColor: '#282932',
                            borderRadius: '4px',
                            color: '#5051F9',
                            width:'200px',
                        }}>
                            {children}
                        </Paper>
                    )}
                    renderOption={(props, option) => (
                        <li {...props} style={{width:'200px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #4F515C' }}>
                            <Typography>{option}</Typography>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            inputProps={{
                                ...params.inputProps,
                                style: {
                                    color: '#F5F5F5',
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    borderRadius: '25px',
                                    color: '#F5F5F5',
                                },
                            }}
                        />
                    )}
                />
                <TextField
                    fullWidth
                    autoComplete='off'
                    placeholder="Add a comment..."
                    value={config.message}
                    onChange={event => dispatch(setMessage(event.target.value))}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        sx: {
                            bgcolor: '#1E1F25',
                            borderRadius: '25px',
                            color: '#F5F5F5',
                            paddingLeft: '20px',
                        },
                    }}
                />

                <IconButton type="submit" color="primary" sx={{ ml: '10px', borderRadius: '50%', width: '50px' }}>
                    <SendIcon sx={{ color: '#F5F5F5' }} />
                </IconButton>
            </Box>
        </form>
    );
}

export default ChatInput;

import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { IMessage } from "../../types";
import instance from "../../axios";

export const sendMessage = createAsyncThunk('msg/sengMsg', async (msgConfig:IMessage, { rejectWithValue }) => {
    try {
        const response = await instance.post('/api/send', msgConfig);
        return response.data;
    } catch (err: any) {
        console.error(err);
        return rejectWithValue(err.message);
    }
});

export const fetchAllMessages = createAsyncThunk('msg/fetchAllMsg', async () => {
    try {
        const response = await instance.get('/');
        return response.data;
    } catch (err: any) {
        console.error(err);
    }
});


interface MessageState {
    messages: IMessage[];
    config: IMessage
}

const initialState: MessageState = {
    messages: [],
    config: {
        id: 0,
        message: '',
        tag: ''
    }
}

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        setMessage: (state, action:PayloadAction<string>) => {
            state.config.message = action.payload
        },
        setTag: (state, action:PayloadAction<string>) => {
            state.config.tag = action.payload
        },
        getMessage: ( state, action:PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: builder =>
        builder
            .addCase(sendMessage.fulfilled, (state, action:PayloadAction<IMessage>) => {
                state.config = {
                    id: 0,
                    message: '',
                    tag: ''
                };

            })
            .addCase(fetchAllMessages.fulfilled, (state, action:PayloadAction<IMessage[]>) => {
                state.messages = action.payload
            })
});

export const { setMessage, setTag, getMessage } = messageSlice.actions

export default messageSlice.reducer;


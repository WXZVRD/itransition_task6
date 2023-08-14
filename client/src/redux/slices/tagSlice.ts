import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    try {
        const response = await instance.get('/api/tags');
        const tagsWithSelect = response.data.map((tag: ITags) => ({
            ...tag,
            isSelect: false,
        }));
        return tagsWithSelect;
    } catch (err) {
        console.log('erroring thehehe');
    }
});


interface ITags {
    id: number;
    tag: string;
    isSelect: boolean
}
enum tagStatus {
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
}
const initialState = {
    tags: [] as ITags[],
    status: tagStatus.LOADING,
}

const tagSlice = createSlice({
    name: 'tagSlice',
    initialState,
    reducers: {
        setActiveTag: (state, action: PayloadAction<string[]>) => {
            const selectedTags = action.payload;

            state.tags = state.tags.map(tag => ({
                ...tag,
                isSelect: selectedTags.includes(tag.tag),
            }));
        },
        addTags: (state, action: PayloadAction<string>) => {
            const tagExists = state.tags.some(tag => tag.tag === action.payload);
            if (!tagExists) {
                state.tags.push({
                    id: state.tags.length + 1,
                    tag: action.payload,
                    isSelect: false,
                });
            }
        },

    },
    extraReducers: builder =>
        builder
            .addCase(fetchTags.pending, (state, action) => {
                state.tags = [];
                state.status = tagStatus.LOADING;
            })
            .addCase(fetchTags.fulfilled, (state, action: PayloadAction<ITags[]>) => {
                state.tags = action.payload;
                state.status = tagStatus.LOADED;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.tags = [];
                state.status = tagStatus.ERROR;
            }),
});

export default tagSlice.reducer;

export const { setActiveTag, addTags } = tagSlice.actions;



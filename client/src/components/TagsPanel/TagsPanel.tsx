import { Autocomplete, Box, Chip, Paper, Stack, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchTags, setActiveTag } from "../../redux/slices/tagSlice";
import EmptyTable from "../EmptyTable/EmptyTable";
// @ts-ignore
import logo from '../../assets/noTag.svg'

const TagsPanel = () => {
    const dispatch = useAppDispatch();
    const tagList = useAppSelector(state => state.tags.tags);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagClick = (tagValue: string) => {
        if (selectedTags.includes(tagValue)) {
            setSelectedTags(selectedTags.filter(tag => tag !== tagValue));
        } else {
            setSelectedTags([...selectedTags, tagValue]);
        }
    };

    useEffect(() => {
        dispatch(setActiveTag(selectedTags))
    }, [selectedTags])

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <Paper sx={{
            width: "100%",
            overflowY: "auto",
            borderRadius: "0px",
            bgcolor: "#1E1F25",
            height: "100vh",
            textAlign: "center",
            maxWidth: "400px",
            padding: "30px 60px",
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
        }}>
            <Typography
                color="#fff"
                fontWeight="Bold"
                fontSize="30px"
                sx={{ mb: "30px" }}
                component="h1">
                My tags
            </Typography>

            <Box sx={{ width: "100%" }}>
                <Autocomplete
                    multiple
                    id="tags-autocomplete"
                    options={tagList.map(tag => tag.tag)}
                    value={selectedTags}
                    onChange={(_, newValue) => setSelectedTags(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                                sx={{ m: 1, bgcolor: "#282932", color: "#fff" }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Select tags"
                            sx={{
                                bgcolor:'#282932',
                            }}
                        />
                    )}
                />
                {selectedTags.length === 0 ? (
                    <EmptyTable logoSrc={logo} primaryText="No tags" secondText="Start tagging you like" />
                ) : (
                    <div>
                        {tagList.map(tag => (
                            <Chip
                                key={tag.tag}
                                label={tag.tag}
                                onClick={() => handleTagClick(tag.tag)}
                                color={selectedTags.includes(tag.tag) ? "primary" : "default"}
                                sx={{ m: 1, bgcolor:'#282932' }}
                            />
                        ))}
                    </div>
                )}
            </Box>
        </Paper>
    );
};

export default TagsPanel;

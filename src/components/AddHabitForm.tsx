import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habit-slice";
import { AppDispatch } from "../store/store";

const AddHabitForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(addHabit({ name, frequency }));
        }
        setName("");
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Glassmorphism
                backdropFilter: "blur(10px)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
        >
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {/* Habit Name Input */}
                    <TextField
                        label="Habit Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Habit Name"
                        fullWidth
                        sx={{
                            borderRadius: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {/* Frequency Selector */}
                    <FormControl fullWidth>
                        <InputLabel id="frequency-label">Frequency</InputLabel>
                        <Select
                            labelId="frequency-label"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                            label="Frequency"
                            sx={{
                                borderRadius: 2,
                            }}
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Add Habit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg, #836FFF, #B5E4FF)",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg, #6A5ACD, #98D8F5)",
                            },
                        }}
                    >
                        Add Habit
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default AddHabitForm;

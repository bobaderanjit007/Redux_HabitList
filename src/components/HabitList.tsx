import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {CheckCircle, Delete} from "@mui/icons-material"

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const today = new Date().toISOString().split("T")[0];

  console.log("Habits : ", habits);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Left Section: Habit Details */}
            <Grid item xs={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {habit.frequency}
              </Typography>
            </Grid>

            {/* Right Section: Buttons */}
            <Grid item xs={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDate.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                >
                  {habit.completedDate.includes(today)
                    ? "Completed"
                    : "Mark Completed"}
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete />}>
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;

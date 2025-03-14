import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../store/habit-slice";

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDate.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper
          key={habit.id}
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Frosted glass effect
            backdropFilter: "blur(12px)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            transition: "0.3s ease",
            "&:hover": { boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.15)" },
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Habit Details */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#5A5A5A",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {habit.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {habit.frequency}
              </Typography>
            </Grid>

            {/* Buttons Section */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-end" },
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: habit.completedDate.includes(today)
                      ? "linear-gradient(135deg, #00C853, #69F0AE)"
                      : "linear-gradient(135deg, #3D5AFE, #81D4FA)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    width: { xs: "100%", sm: "auto" }, // Full width on small screens
                    "&:hover": {
                      background: habit.completedDate.includes(today)
                        ? "linear-gradient(135deg, #009624, #00E676)"
                        : "linear-gradient(135deg, #304FFE, #64B5F6)",
                    },
                  }}
                  startIcon={<CheckCircle />}
                  onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
                >
                  {habit.completedDate.includes(today) ? "Completed" : "Mark Completed"}
                </Button>
                <Button
                  onClick={() => dispatch(removeHabit({ id: habit.id }))}
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #FF5252, #FF8A80)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    width: { xs: "100%", sm: "auto" }, // Full width on small screens
                    "&:hover": {
                      background: "linear-gradient(135deg, #D32F2F, #FF5252)",
                    },
                  }}
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Streak Progress Bar */}
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#5A5A5A",
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              Current Streak: {getStreak(habit)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              sx={{
                mt: 1,
                height: { xs: 8, md: 10 },
                borderRadius: 5,
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg, #4CAF50, #81C784)",
                },
              }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;

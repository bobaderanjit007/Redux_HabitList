import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits, Habit } from "../store/habit-slice";
import { 
  LinearProgress, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Stack 
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ListIcon from "@mui/icons-material/List";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const today = new Date().toISOString().split("T")[0];

  const getCompletedTodayHabits = useMemo(() => {
    return habits.filter((habit) => habit.completedDate.includes(today)).length;
  }, [habits, today]);

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

  const longestStreak = useMemo(() => {
    return habits.length > 0 ? Math.max(...habits.map(getStreak), 0) : 0;
  }, [habits]);

  if (isLoading) return <LinearProgress sx={{ mt: 3 }} />;

  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 3, mt: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {typeof error === "string" ? error : "An unexpected error occurred"}
        </Typography>
      </Paper>
    );
  }

  return (
    <Card elevation={3} sx={{ mx: "auto", mt: 4, p: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Habit Statistics
        </Typography>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ListIcon color="primary" />
            <Typography variant="body1">
              <strong>Total Habits:</strong> {habits.length}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon color="success" />
            <Typography variant="body1">
              <strong>Completed Today:</strong> {getCompletedTodayHabits}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <TrendingUpIcon color="secondary" />
            <Typography variant="body1">
              <strong>Longest Streak:</strong> {longestStreak}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default HabitStats;

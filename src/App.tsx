import { Provider } from "react-redux";
import store from "./store/store";
import { Container, Typography, Paper, Box } from "@mui/material";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";

function App() {
  return (
    <Provider store={store}>
      {/* Background with soft gradient */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #FCEFF9, #E0F2FE)", // Light pastel gradient
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.7)", // Glossy glassmorphism effect
              backdropFilter: "blur(12px)", // Smooth blur
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
            }}
          >
            {/* Title */}
            <Typography
              variant="h3"
              fontWeight="bold"
              align="center"
              gutterBottom
              sx={{
                color: "black", // Soft lavender
                textShadow: "1px 1px 4px rgba(131, 111, 255, 0.3)",
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            >
              Habit Tracker
            </Typography>

            {/* Add Habit Form */}
            <Box sx={{ mb: 4 }}>
              <AddHabitForm />
            </Box>

            {/* Habit List */}
            <HabitList />

            {/* Habit Stats */}
            <Box sx={{ mt: 4 }}>
              <HabitStats />
            </Box>
          </Paper>
        </Container>
      </Box>
    </Provider>
  );
}

export default App;

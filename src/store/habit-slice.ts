import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
    id : string;
    name: string;
    frequency: 'daily' | 'weekly';
    completedDate : string[],
    createdAt: string,
}

interface HabitState {
    habits: Habit[],
    isLoading: boolean,
    error : string | null,
}

const initialState : HabitState = {
    habits:[],
    isLoading: false,
    error: null,
}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
    // Semulating api call
    await new Promise((resolve) =>setTimeout(resolve ,1000));
    const mockHabits : Habit[] = [
        {
            id: "1",
            name: "Reading",
            frequency: "daily",
            completedDate: [
                new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0], // 3 days ago
                new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0], // 2 days ago
                new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0], // Yesterday
                new Date(Date.now() - 0 * 86400000).toISOString().split("T")[0] // Yesterday
            ],
            createdAt: "2022-01-01",
        },
        {
            id: "2",
            name: "Running",
            frequency: "weekly",
            completedDate: ["2022-01-03", "2022-01-10"],
            createdAt: "2022-01-02",
        }
    ]

    return mockHabits;
})

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{name: string, frequency: 'daily' | 'weekly'}>) => {
            const newHabit : Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDate: [],
                createdAt: new Date().toISOString(),
            }

            state.habits.push(newHabit);
        },
        toggleHabit: (state, action : PayloadAction<{id: string, date: string}>) => {
            const habit = state.habits.find((habit) => habit.id === action.payload.id);
            if(habit){
                const index = habit.completedDate.indexOf(action.payload.date);
                if(index > -1){
                    habit.completedDate.splice(index, 1);
                }else{
                    habit.completedDate.push(action.payload.date);
                }
            }
        },
        removeHabit: (state, action : PayloadAction<{id: string}>) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchHabits.fulfilled, (state, action) => {
            state.habits = action.payload;
            state.isLoading = false;
        }).addCase(fetchHabits.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch habits";
            state.isLoading = false;
        });
    }
})

export const {addHabit, toggleHabit, removeHabit} = habitSlice.actions;
export default habitSlice.reducer
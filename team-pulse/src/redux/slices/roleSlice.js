import { createSlice, current } from "@reduxjs/toolkit"

const roleSlice = createSlice({
    name: "role",
    initialState: {
        currentRole: "TeamLead",
        currentUser: null,
    },
    reducers: {
        switchRole: (state, action) => {
            state.currentRole = action.payload;
        },
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { switchRole, setUser} = roleSlice.actions;
export default roleSlice.reducer;
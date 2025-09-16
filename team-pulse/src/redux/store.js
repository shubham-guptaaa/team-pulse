import { configureStore } from "@reduxjs/toolkit";
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';

const store = configureStore({
    reducer: {
        members: membersReducer,
        role: roleReducer,
    },
});
export default store;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    isAuthenticated: false,
    user: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
    isAuthenticated: (state, action) => {
      state.users.isAuthenticated = !state.isAuthenticated;
    },
    setUser: (state, action) => {
      state.users.user = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { isAuthenticated, setUser } = userSlice.actions;

export default userSlice.reducer;

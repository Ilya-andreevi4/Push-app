import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"
// import { fetchUsers } from "./ActionCreators";

// interface UserState {
//   users: IUser[];
//   isLoading: boolean;
//   error: string
// }

const initialState: IUser = {
  token: '',
  id: '',
  email: '',
  // firstName: '',
  // lastName: '',
  // password: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    addUser(state, action: PayloadAction<IUser>) {
      console.log(state)
      state.email= action.payload.email;   
      state.token= action.payload.token; 
      state.id= action.payload.id;
    },
    removeUser(state) {
      state.email= null;   
      state.token= null;   
      state.id= null;
    },
  }
  // extraReducers: {

  //   [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
  //     state.isLoading = false;
  //     state.error = '';
  //     state.users = action.payload;
  //   },
  //   [fetchUsers.pending.type]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }
  // }
});
export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
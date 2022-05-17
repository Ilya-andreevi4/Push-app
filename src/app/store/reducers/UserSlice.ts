import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser"
const initialState: IUser = {
  email: '',
  password: '',
  token: '',
  id: '',  
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
      state.email= '';   
      state.token= '';   
      state.id= '';
    },
  }
});
export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
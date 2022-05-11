import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/IUser";

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {      
    const response = await axios.get<IUser[]>('http://localhost:5000/users')
    return response.data;
    } catch(e) {
      return thunkAPI.rejectWithValue(`${e} Не удалось загрузить профили`)
    }
  }
)


// export const addUser = createAsyncThunk(
//   'user/addUser',
//   async (data, {rejectWithValue, dispatch}) => {
//     try { 
//       const user = {

//       }
//     const response = await axios.post<IUser[]>('http://localhost:5000/users')
//     return response.data;
//     } catch(e) {
//       return rejectWithValue(`${e} Не удалось создать профиль`)
//     }
//   }
// )
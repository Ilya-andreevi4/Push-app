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


export const addUser = createAsyncThunk(
  'user/addUser',
  async (data:IUser, {rejectWithValue, dispatch}) => {
    try { 
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      throw new Error('Can\'t registration user. Server error');
    }
    const userData = await response.json();
    dispatch(addUser(userData))
    } catch(e) {
      return rejectWithValue(`${e} Не удалось создать профиль`)
    }
  }
)
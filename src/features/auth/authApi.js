import { createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from "../../api/client"

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, first_name, last_name, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/registration', {
        email,
        first_name,
        last_name,
        password,
      });
      return response.data;
    } catch (error) {
    // return custom error message from API
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post('/login', {
        email,
        password,
      });
      // store user's token in local storage
      localStorage.setItem('userToken', data.data.token)
      return data
    } catch (error) {
      // return custom error message from API
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
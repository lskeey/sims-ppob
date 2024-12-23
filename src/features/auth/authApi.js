import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'https://take-home-test-api.nutech-integrasi.com'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, first_name, last_name, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/registration', {
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
      const { data } = await axiosInstance.post('/login', {
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
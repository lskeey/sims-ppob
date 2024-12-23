import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client";

// Read profile
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  const response = await apiClient.get('/profile');
  return response.data;
});

// Update profile
export const updateProfile = createAsyncThunk('profile/updateProfile', async (updatedData) => {
  const response = await apiClient.put('/profile/update', updatedData);
  return response.data;
});

// Update image
export const updateProfileImage = createAsyncThunk('profile/updateProfileImage', async (imageData) => {
  const response = await apiClient.put('/profile/image', imageData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
});
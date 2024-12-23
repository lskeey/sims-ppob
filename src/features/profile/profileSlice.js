import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, updateProfile, updateProfileImage } from './profileApi';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    status: 0,
    message: '',
    user: {
      email: '',
      firstName: '',
      lastName: '',
      profileImage: '',
    },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.user.email = action.payload.data.email;
        state.user.firstName = action.payload.data.first_name;
        state.user.lastName = action.payload.data.last_name;
        state.user.profileImage = action.payload.data.profile_image;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.user.firstName = action.payload.data.first_name;
        state.user.lastName = action.payload.data.last_name;
        state.user.email = action.payload.data.email;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateProfileImage
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.user.profileImage = action.payload.data.profile_image;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default profileSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../app/utils/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    mode: 'light',
    user: [],
    otherUser: [],
};

export const getUserProfile = createAsyncThunk(
    'post/getUserProfile',
    async (data) => {
        const { userId } = data;
        try {
            const response = await axiosInstance.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'post/updateUserProfile',
    async (data) => {
        try {
            const response = axiosInstance.put(`/user/me`, data);
            toast.promise(response, {
                loading: 'Updating profile...',
                success: (response) => {
                    return response.data.message;
                },
                error: 'Failed to update the profile',
            });
            return (await response).data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

export const getUserProfileOfOtherUser = createAsyncThunk(
    'post/getUserProfileOfOtherUser',
    async (data) => {
        const { userId } = data;
        try {
            const response = await axiosInstance.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(getUserProfileOfOtherUser.fulfilled, (state, action) => {
                state.otherUser = action.payload.user;
            });
    },
});
export const selectMode = (state) => state.user.mode;

export const selectUser = (state) => state.user.user;
export const selectOtherUser = (state) => state.user.otherUser;
export const { setMode } = userSlice.actions;
export default userSlice.reducer;

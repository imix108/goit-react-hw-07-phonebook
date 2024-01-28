import { createSlice } from '@reduxjs/toolkit';
import {
  addContactsThunk,
  delContactsThunk,
  getContactsThunk,
} from './ContactsThunk';

const handlePending = state => {
  state.isLoading = true;
  state.error = null; 
};

const handleReject = (state, { payload }) => {
  state.isLoading = false; 
  state.error = payload;
};

const sliceContact = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, handlePending)
      .addCase(getContactsThunk.rejected, handleReject)
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false; 
        state.items = payload;
      })
      .addCase(addContactsThunk.pending, handlePending)
      .addCase(addContactsThunk.rejected, handleReject)
      .addCase(addContactsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false; 
        state.items.push(payload); 
      })
      .addCase(delContactsThunk.pending, handlePending)
      .addCase(delContactsThunk.rejected, handleReject)
      .addCase(delContactsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false; 
        state.items = state.items.filter(item => item.id !== payload.id);
      });
  },
});

export const contactsReducer = sliceContact.reducer;

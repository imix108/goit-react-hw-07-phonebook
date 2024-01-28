import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContacts, delContacts, getContacts } from '../service/serviceApi';

export const getContactsThunk = createAsyncThunk(
  'contacts/allContacts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const data = await addContacts(contact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delContactsThunk = createAsyncThunk(
  'contacts/delContact',
  async (id, { rejectWithValue }) => {
    try {
      const data = await delContacts(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Http from "../../Http";
import axios from "axios";
import Cookies from "js-cookie";

// Initial State
const initialState = {
  settings: [],
  loading: false,
  error: null,
};

// Get Settings using Axios and Redux Thunk
export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("_auth");
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.okamel.info/DashboardApi/Settings/Get-all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response al data: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Book using Axios and Redux Thunk
export const addSetting = createAsyncThunk(
  "settings/addSetting",
  async (data, { rejectWithValue }) => {
    try {
      await Http({
        method: "POST",
        url: `/Settings/Insert`,
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Settings using Axios and Redux Thunk
export const updateSetting = createAsyncThunk(
  "settings/updateSetting",
  async (data, { rejectWithValue }) => {
    console.log("data from form: ", data);
    try {
      await Http({
        method: "POST",
        url: `/Settings/Update`,
        params: {
          id: data.get("id"),
          prayer_timings: data.get("prayer_timings"),
        },
        data,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Settings Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ======Get Settings======
    // Pending
    builder.addCase(getSettings.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    });
    // Rejected
    builder.addCase(getSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Add Setting======
    // Pending
    builder.addCase(addSetting.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(addSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(addSetting.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ======Update Settings======
    // Pending
    builder.addCase(updateSetting.pending, (state, action) => {
      state.loading = true;
    });
    // Fulfilled
    builder.addCase(updateSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    // Rejected
    builder.addCase(updateSetting.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default settingsSlice.reducer;

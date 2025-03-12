import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const getPastesFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedPastes = localStorage.getItem("pastes");
    return storedPastes ? JSON.parse(storedPastes) : [];
  }
  return [];
};

const initialState = {
  pastes: getPastesFromStorage(),
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        if (typeof window !== "undefined") {
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
        }

      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        if (typeof window !== "undefined") {
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
        }

        toast.success("Paste Deleted");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("pastes");
      }

      toast.success("All Pastes Reset");
    },
  },
});

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
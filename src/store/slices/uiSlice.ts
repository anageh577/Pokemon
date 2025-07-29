import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: UIState = {
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 20,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    resetPagination: (state) => {
      state.currentPage = 1;
    },
  },
});

export const {
  setLoading,
  setError,
  setCurrentPage,
  setItemsPerPage,
  nextPage,
  previousPage,
  resetPagination,
} = uiSlice.actions;

export default uiSlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, PokemonState } from '../../types/pokemon';

const initialState: PokemonState = {
  favorites: [],
  searchTerm: '',
  selectedType: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Pokemon>) => {
      const exists = state.favorites.find(p => p.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(p => p.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Pokemon>) => {
      const existingIndex = state.favorites.findIndex(p => p.id === action.payload.id);
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string | null>) => {
      state.selectedType = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedType = null;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setSearchTerm,
  setSelectedType,
  clearFilters,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
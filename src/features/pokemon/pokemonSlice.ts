import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, PokemonDetailResponse } from '../../types/pokemon';

interface PokemonState {
  selectedPokemon: Pokemon | null;
  favorites: number[];
  cache: Record<number, PokemonDetailResponse>;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PokemonState = {
  selectedPokemon: null,
  favorites: [],
  cache: {},
  currentPage: 0,
  itemsPerPage: Number(process.env.REACT_APP_ITEMS_PER_PAGE) || 20,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    cachePokemonDetail: (state, action: PayloadAction<{ id: number; detail: PokemonDetailResponse }>) => {
      state.cache[action.payload.id] = action.payload.detail;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearCache: (state) => {
      state.cache = {};
    },
  },
});

export const {
  setSelectedPokemon,
  addToFavorites,
  removeFromFavorites,
  cachePokemonDetail,
  setCurrentPage,
  clearCache,
} = pokemonSlice.actions;
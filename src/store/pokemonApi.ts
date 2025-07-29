import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon, PokemonListResponse, PokemonDetailResponse, PaginationParams } from '../types/pokemon';

const baseUrl =  'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Pokemon', 'PokemonList'],
  endpoints: (builder) => ({
    // Get paginated list of Pokemon
    getPokemonList: builder.query<PokemonListResponse, PaginationParams>({
      query: ({ limit = 20, offset = 0 } = {}) => ({
        url: '/pokemon',
        params: { limit, offset },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ name }: { name: string }) => ({ type: 'Pokemon' as const, id: name })),
              { type: 'PokemonList', id: 'LIST' },
            ]
          : [{ type: 'PokemonList', id: 'LIST' }],
      transformResponse: (response: any) => {
        // Add id to each Pokemon from URL
        const pokemonWithIds = response.results.map((pokemon: { url: string }, index: number) => {
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]);
          return {
            ...pokemon,
            id: id || index + 1,
          };
        });
        
        return {
          ...response,
          results: pokemonWithIds,
        };
      },
    }),

    // Get detailed Pokemon information
    getPokemonDetail: builder.query<Pokemon, string | number>({
      query: (pokemonId) => `/pokemon/${pokemonId}`,
      providesTags: (result, error, id) => [{ type: 'Pokemon', id }],
      transformResponse: (response: PokemonDetailResponse): Pokemon => {
        return {
          id: response.id,
          name: response.name,
          url: `${baseUrl}/pokemon/${response.id}/`,
          sprites: response.sprites,
          types: response.types,
          abilities: response.abilities,
          stats: response.stats,
          height: response.height,
          weight: response.weight,
          base_experience: response.base_experience,
        };
      },
    }),

    // Get Pokemon by name (for search functionality)
    searchPokemon: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name.toLowerCase()}`,
      providesTags: (result, error, name) => [{ type: 'Pokemon', id: name }],
      transformResponse: (response: PokemonDetailResponse): Pokemon => {
        return {
          id: response.id,
          name: response.name,
          url: `${baseUrl}/pokemon/${response.id}/`,
          sprites: response.sprites,
          types: response.types,
          abilities: response.abilities,
          stats: response.stats,
          height: response.height,
          weight: response.weight,
          base_experience: response.base_experience,
        };
      },
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useSearchPokemonQuery,
  useLazyGetPokemonDetailQuery,
  useLazySearchPokemonQuery,
} = pokemonApi;

// Export hooks for testing
export const pokemonApiHooks = {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useSearchPokemonQuery,
  useLazyGetPokemonDetailQuery,
  useLazySearchPokemonQuery,
};
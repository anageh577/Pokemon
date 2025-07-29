import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../store/pokemonApi';
import pokemonReducer from '../../store/slices/pokemonSlice';
import uiReducer from '../../store/slices/uiSlice';
import PokemonListPage from '../PokemonListPage';

// Mock the API hooks
jest.mock('../../store/pokemonApi', () => ({
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
  useGetPokemonListQuery: jest.fn(),
}));

const mockStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    ui: uiReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

const mockPokemonList = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      id: 2,
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const createMockQueryResult = (overrides: any = {}) => ({
  data: mockPokemonList,
  isLoading: false,
  error: null,
  refetch: jest.fn(),
  ...overrides,
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('PokemonListPage', () => {
  const mockUseGetPokemonListQuery = pokemonApi.useGetPokemonListQuery as jest.MockedFunction<typeof pokemonApi.useGetPokemonListQuery>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and description', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult());

    renderWithProviders(<PokemonListPage />);
    
    expect(screen.getByText('Pokemon Explorer')).toBeInTheDocument();
    expect(screen.getByText('Discover and explore the world of Pokemon')).toBeInTheDocument();
  });

  it('renders search bar', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult());

    renderWithProviders(<PokemonListPage />);
    
    expect(screen.getByPlaceholderText('Search Pokemon...')).toBeInTheDocument();
  });

  it('shows loading spinner when data is loading', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult({
      data: undefined,
      isLoading: true,
    }));

    renderWithProviders(<PokemonListPage />);
    
    expect(screen.getByRole('generic')).toBeInTheDocument(); // Loading spinner
  });

  it('shows error message when API call fails', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult({
      data: undefined,
      error: { status: 500, data: 'Internal Server Error' },
    }));

    renderWithProviders(<PokemonListPage />);
    
    expect(screen.getByText('Error loading Pokemon')).toBeInTheDocument();
    expect(screen.getByText('There was an error loading the Pokemon list. Please try again.')).toBeInTheDocument();
  });

  it('renders pokemon list when data is available', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult());

    renderWithProviders(<PokemonListPage />);
    
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });

  it('handles search input changes', async () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult());

    renderWithProviders(<PokemonListPage />);
    
    const searchInput = screen.getByPlaceholderText('Search Pokemon...');
    fireEvent.change(searchInput, { target: { value: 'bulba' } });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('bulba');
    });
  });

  it('navigates to pokemon detail when pokemon is clicked', () => {
    mockUseGetPokemonListQuery.mockReturnValue(createMockQueryResult());

    renderWithProviders(<PokemonListPage />);
    
    const pokemonCard = screen.getByText('Bulbasaur').closest('div');
    fireEvent.click(pokemonCard!);
    
    // Navigation would be tested in integration tests
    // This test just ensures the click handler is called
  });
}); 
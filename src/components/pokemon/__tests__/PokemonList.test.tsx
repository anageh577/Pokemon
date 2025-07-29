import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonList from '../PokemonList';

const mockPokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    },
    types: [
      {
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
        }
      }
    },
    types: [
      {
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/'
        }
      }
    ]
  }
];

describe('PokemonList', () => {
  const defaultProps = {
    pokemon: mockPokemon,
    onPokemonClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pokemon cards correctly', () => {
    render(<PokemonList {...defaultProps} />);
    
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('#002')).toBeInTheDocument();
  });

  it('calls onPokemonClick when a pokemon card is clicked', () => {
    render(<PokemonList {...defaultProps} />);
    const firstCard = screen.getByText('Bulbasaur').closest('div');
    fireEvent.click(firstCard!);
    expect(defaultProps.onPokemonClick).toHaveBeenCalledWith(mockPokemon[0]);
  });

  it('shows loading spinner when isLoading is true and no pokemon', () => {
    render(<PokemonList {...defaultProps} pokemon={[]} isLoading />);
    const spinner = screen.getByRole('generic');
    expect(spinner.firstChild).toHaveClass('animate-spin');
  });

  it('shows error message when error is provided', () => {
    const error = 'Failed to load pokemon';
    render(<PokemonList {...defaultProps} error={error} />);
    expect(screen.getByText(/error loading pokemon/i)).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('shows "No Pokemon found" when pokemon array is empty', () => {
    render(<PokemonList {...defaultProps} pokemon={[]} />);
    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
  });

  it('shows load more button when hasNextPage is true', () => {
    render(<PokemonList {...defaultProps} hasNextPage onLoadMore={jest.fn()} />);
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  it('calls onLoadMore when load more button is clicked', () => {
    const onLoadMore = jest.fn();
    render(<PokemonList {...defaultProps} hasNextPage onLoadMore={onLoadMore} />);
    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);
    expect(onLoadMore).toHaveBeenCalled();
  });

  it('shows loading state in load more button when isLoading is true', () => {
    render(<PokemonList {...defaultProps} hasNextPage onLoadMore={jest.fn()} isLoading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('generic')).toBeInTheDocument(); // Loading spinner
  });

  it('disables load more button when isLoading is true', () => {
    render(<PokemonList {...defaultProps} hasNextPage onLoadMore={jest.fn()} isLoading />);
    const loadMoreButton = screen.getByText('Loading...').closest('button');
    expect(loadMoreButton).toBeDisabled();
  });

  it('does not show load more button when hasNextPage is false', () => {
    render(<PokemonList {...defaultProps} hasNextPage={false} onLoadMore={jest.fn()} />);
    expect(screen.queryByText('Load More')).not.toBeInTheDocument();
  });

  it('renders pokemon in a grid layout', () => {
    render(<PokemonList {...defaultProps} />);
    const grid = screen.getByText('Bulbasaur').closest('div')?.parentElement;
    expect(grid).toHaveClass('grid');
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../PokemonCard';

const mockPokemon = {
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
    },
    {
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/'
      }
    }
  ]
};

describe('PokemonCard', () => {
  const defaultProps = {
    pokemon: mockPokemon,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pokemon information correctly', () => {
    render(<PokemonCard {...defaultProps} />);
    
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<PokemonCard {...defaultProps} />);
    const card = screen.getByRole('generic');
    fireEvent.click(card);
    expect(defaultProps.onClick).toHaveBeenCalledWith(mockPokemon);
  });

  it('renders favorite button when onToggleFavorite is provided', () => {
    const onToggleFavorite = jest.fn();
    render(<PokemonCard {...defaultProps} onToggleFavorite={onToggleFavorite} />);
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    const onToggleFavorite = jest.fn();
    render(<PokemonCard {...defaultProps} onToggleFavorite={onToggleFavorite} />);
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(favoriteButton);
    expect(onToggleFavorite).toHaveBeenCalledWith(mockPokemon);
  });

  it('prevents card click when favorite button is clicked', () => {
    const onToggleFavorite = jest.fn();
    render(<PokemonCard {...defaultProps} onToggleFavorite={onToggleFavorite} />);
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(favoriteButton);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('shows filled heart when isFavorite is true', () => {
    const onToggleFavorite = jest.fn();
    render(
      <PokemonCard 
        {...defaultProps} 
        onToggleFavorite={onToggleFavorite} 
        isFavorite={true} 
      />
    );
    const favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
    expect(favoriteButton).toHaveClass('text-red-500');
  });

  it('shows empty heart when isFavorite is false', () => {
    const onToggleFavorite = jest.fn();
    render(
      <PokemonCard 
        {...defaultProps} 
        onToggleFavorite={onToggleFavorite} 
        isFavorite={false} 
      />
    );
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    expect(favoriteButton).toHaveClass('text-gray-300');
  });

  it('renders pokemon image with correct src', () => {
    render(<PokemonCard {...defaultProps} />);
    const image = screen.getByAltText('bulbasaur');
    expect(image).toHaveAttribute('src', mockPokemon.sprites.other['official-artwork'].front_default);
  });

  it('handles image error gracefully', () => {
    render(<PokemonCard {...defaultProps} />);
    const image = screen.getByAltText('bulbasaur');
    fireEvent.error(image);
    expect(image).toHaveAttribute('src', '/placeholder-pokemon.png');
  });
}); 
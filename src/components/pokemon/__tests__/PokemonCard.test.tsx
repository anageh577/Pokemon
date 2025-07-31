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
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
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
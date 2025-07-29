import React from 'react';
import clsx from 'clsx';
import type { PokemonCardProps } from '../../types/pokemon';
import Card from '../common/Card';

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleClick = () => {
    onClick(pokemon);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(pokemon);
    }
  };

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  return (
    <Card hover onClick={handleClick} className="p-4 relative">
      {onToggleFavorite && (
        <button
          onClick={handleFavoriteClick}
          className={clsx(
            'absolute top-2 right-2 text-2xl transition-colors',
            isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-400'
          )}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      )}
      
      <div className="text-center">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-24 h-24 mx-auto mb-2 object-contain"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-pokemon.png';
          }}
        />
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {capitalizedName}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          #{pokemon.id.toString().padStart(3, '0')}
        </p>
        
        {pokemon.types && (
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={clsx(
                  'px-2 py-1 rounded-full text-xs font-medium text-white',
                  typeColors[type.type.name] || 'bg-gray-400'
                )}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PokemonCard; 
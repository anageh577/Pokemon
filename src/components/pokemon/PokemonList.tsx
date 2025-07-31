import React from 'react';
import type { PokemonListProps } from '../../types/pokemon';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

const PokemonList: React.FC<PokemonListProps> = ({
  pokemon,
  isLoading = false,
  error = null,
  onPokemonClick,
  onLoadMore,
  hasNextPage = false,
}) => {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading Pokemon: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading && pokemon.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="divide-y divide-gray-200">
        {pokemon.map((p) => (
          <li key={p.id} className="py-4">
            <div 
              className="flex items-center justify-between space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => onPokemonClick(p)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                alt={p.name}
                className="w-16 h-16 object-contain"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-pokemon.png';
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                </h3>
                {p.types && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-400"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {hasNextPage && onLoadMore && (
        <div className="flex justify-center">
          <Button 
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-8"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PokemonList; 
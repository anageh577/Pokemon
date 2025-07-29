import React from 'react';
import type { PokemonListProps } from '../../types/pokemon';
import PokemonCard from './PokemonCard';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={onPokemonClick}
          />
        ))}
      </div>

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
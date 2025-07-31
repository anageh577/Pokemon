import React, { useEffect } from 'react';
import type { PokemonDetailProps } from '../../types/pokemon';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  isLoading = false,
  error = null,
  onBack,
}) => {
  // Update page title when Pokemon data is available
  useEffect(() => {
    if (pokemon && pokemon.name) {
      const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      document.title = `${capitalizedName}`;
    } else {
      document.title = 'Pokémon App';
    }
  }, [pokemon]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading Pokemon details: {error}</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
    {/* Sticky Header */}
    <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 py-4 flex items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Pokémon List
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="pt-4">
    <div className="py-10 px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-10 w-[500px]">
        {/* Header with Image */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <img
            src={
              pokemon.sprites?.other?.['official-artwork']?.front_default ??
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className="w-60 h-60 object-contain drop-shadow-xl"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-0">
          {/* Name */}
          <div className="flex items-center py-4 border-b border-gray-200 justify-between">
            <span className="text-lg font-semibold text-gray-700 w-24">Name</span>
            <span className="text-lg text-gray-900 capitalize">{pokemon.name}</span>
          </div>
          
          {/* Height */}
          <div className="flex items-center py-4 border-b border-gray-200 justify-between">
            <span className="text-lg font-semibold text-gray-700 w-24">Height</span>
            <span className="text-lg text-gray-900">{pokemon.height ? pokemon.height / 10 : 'N/A'} m</span>
          </div>
          
          {/* Weight */}
          <div className="flex items-center py-4 border-b border-gray-200 justify-between">
            <span className="text-lg font-semibold text-gray-700 w-24">Weight</span>
            <span className="text-lg text-gray-900">{pokemon.weight ? pokemon.weight / 10 : 'N/A'} kg</span>
          </div>
          
          {/* Types */}
          <div className="flex items-center py-4 justify-between">
            <span className="text-lg font-semibold text-gray-700 w-24">Types</span>
            <div className="flex flex-wrap gap-2">
              {pokemon.types?.map(({ type }) => (
                <span
                  key={type.name}
                  className="px-3 py-1 text-sm rounded-full font-medium capitalize"
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default PokemonDetail; 
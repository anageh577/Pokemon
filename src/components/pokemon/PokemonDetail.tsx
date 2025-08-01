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

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  // Update page title when Pokemon data is available
  useEffect(() => {
    if (pokemon && pokemon.name) {
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



  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
    {/* Sticky Header */}
    <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-sm">
    <div className="h-[50px] bg-[#2e7df6] flex items-center px-4">
    <svg
  onClick={onBack}
  className="w-5 h-5 cursor-pointer mr-4"
  fill="none"
  stroke="white"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 19l-7-7 7-7"
  />
</svg>
        <p className="text-white text-2xl font-bold">{capitalizedName}</p>
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
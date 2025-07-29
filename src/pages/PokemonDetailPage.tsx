import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonDetailQuery } from '../store/pokemonApi';
import PokemonDetail from '../components/pokemon/PokemonDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, error } = useGetPokemonDetailQuery(id || '');

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pokemon not found
          </h1>
          <p className="text-gray-600 mb-6">
            The Pokemon you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <PokemonDetail pokemon={pokemon} onBack={handleBack} />;
};

export default PokemonDetailPage; 
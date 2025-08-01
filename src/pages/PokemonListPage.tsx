import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSearchTerm } from '../store/slices/pokemonSlice';
import { setCurrentPage } from '../store/slices/uiSlice';
import PokemonList from '../components/pokemon/PokemonList';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PokemonListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.pokemon);
  const { currentPage, itemsPerPage } = useAppSelector((state) => state.ui);

  const [searchInput, setSearchInput] = useState(searchTerm);

  // Set page title
  useEffect(() => {
    document.title = 'PokeReact';
  }, []);

  const { data: pokemonList, isLoading, error } = useGetPokemonListQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  // Filter Pokemon based on search term
  const filteredPokemon = useMemo(() => {
    if (!pokemonList?.results || !searchInput.trim()) {
      return pokemonList?.results.map((pokemon: { name: string, url: string }) => ({
        id: parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0'),
        name: pokemon.name,
        url: pokemon.url,
      })) || [];
    }

    return pokemonList.results
      .filter((pokemon: { name: string }) => 
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map((pokemon: { name: string, url: string }) => ({
        id: parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0'),
        name: pokemon.name,
        url: pokemon.url,
      }));
  }, [pokemonList, searchInput]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    dispatch(setSearchTerm(value));
    dispatch(setCurrentPage(1));
  };

  const handlePokemonClick = (pokemon: any) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleLoadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  if (isLoading && !pokemonList) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading Pokemon
          </h1>
          <p className="text-gray-600 mb-6">
            There was an error loading the Pokemon list. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[50px] bg-[#2e7df6] flex items-center px-8">
        <p className="text-white text-2xl font-bold">PokeReact</p>
      </div>
      <div className="max-w-[500px] mx-auto px-4 py-8">
      

        <div className="mb-6">
          <SearchBar
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search Pokemon..."
            isLoading={isLoading}
          />
        </div>

        {pokemonList && (
          <PokemonList
            pokemon={filteredPokemon}
            isLoading={isLoading}
            error={error}
            onPokemonClick={handlePokemonClick}
            onLoadMore={handleLoadMore}
            hasNextPage={!!pokemonList.next && !searchInput.trim()}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonListPage; 
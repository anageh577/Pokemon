export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default?: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  types?: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities?: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
  stats?: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  height?: number;
  weight?: number;
  base_experience?: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonDetailResponse extends Pokemon {}

// src/types/api.ts
export interface ApiError {
  status: number;
  data: {
    message: string;
    error?: string;
  };
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// src/types/store.ts
export interface PokemonState {
  favorites: Pokemon[];
  searchTerm: string;
  selectedType: string | null;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

export interface RootState {
  pokemon: PokemonState;
  ui: UIState;
}

// src/types/components.ts
export interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (pokemon: Pokemon) => void;
}

export interface PokemonListProps {
  pokemon: Pokemon[];
  isLoading?: boolean;
  error?: string | null;
  onPokemonClick: (pokemon: Pokemon) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
}

export interface PokemonDetailProps {
  pokemon: Pokemon;
  isLoading?: boolean;
  error?: string | null;
  onBack: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps {
  children: any;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: any;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}
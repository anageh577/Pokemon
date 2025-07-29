# Pokemon Explorer App

A modern React TypeScript application that retrieves and displays Pokemon data from the PokeAPI. Built with Redux Toolkit, RTK Query, and Tailwind CSS.

## Features

- 🎯 **Pokemon List**: Browse through a paginated list of Pokemon
- 🔍 **Search Functionality**: Search for specific Pokemon by name
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful, clean interface with smooth animations
- 💾 **Persistent Storage**: Favorites and user preferences are saved locally
- ⚡ **Fast Performance**: Optimized with RTK Query for efficient data fetching
- 🧪 **Comprehensive Testing**: 60%+ test coverage with unit and integration tests

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Testing**: Jest with React Testing Library
- **Build Tool**: Vite
- **Package Manager**: npm

## Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Different API Environments

The application supports multiple API environments through environment variables:

#### Local Development (Default)
```bash
npm run dev
```
Uses: `https://pokeapi.co/api/v2`

#### Local API
```bash
npm run dev:local
```
Uses: `http://localhost:3001/api`

#### Staging Environment
```bash
npm run dev:staging
```
Uses: `https://staging-pokeapi.co/api/v2`

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests with UI
```bash
npm run test:ui
```

## Code Quality

### Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

### Type Checking
```bash
npm run type-check
```

### Format Code
```bash
npm run format
```

### Check Code Formatting
```bash
npm run format:check
```

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SearchBar.tsx
│   │   └── ErrorBoundary.tsx
│   └── pokemon/          # Pokemon-specific components
│       ├── PokemonCard.tsx
│       ├── PokemonDetail.tsx
│       └── PokemonList.tsx
├── pages/                # Page components
│   ├── PokemonListPage.tsx
│   ├── PokemonDetailPage.tsx
│   └── NotFoundPage.tsx
├── store/                # Redux store configuration
│   ├── store.ts          # Main store setup
│   ├── hooks.ts          # Typed Redux hooks
│   ├── pokemonApi.ts     # RTK Query API
│   └── slices/           # Redux slices
│       ├── pokemonSlice.ts
│       └── uiSlice.ts
├── types/                # TypeScript type definitions
│   └── pokemon.ts
└── setupTests.ts         # Jest setup configuration
```

## API Integration

The application integrates with the PokeAPI:

- **Pokemon List**: `GET https://pokeapi.co/api/v2/pokemon/`
- **Pokemon Details**: `GET https://pokeapi.co/api/v2/pokemon/{id}/`

### Environment Variables

- `VITE_POKEMON_API_BASE_URL`: Base URL for the Pokemon API (defaults to `https://pokeapi.co/api/v2`)

## Key Features Implementation

### 1. Code Separation
- **Components**: Modular, reusable components with clear responsibilities
- **Pages**: Container components for different routes
- **Store**: Centralized state management with Redux Toolkit
- **Types**: Shared TypeScript interfaces and types

### 2. Clean Code
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code style and best practices
- **Prettier**: Automatic code formatting
- **Component Structure**: Clear separation of concerns

### 3. Readability
- **Descriptive Names**: Clear variable and function names
- **Comments**: Strategic comments for complex logic
- **File Organization**: Logical folder structure
- **Consistent Patterns**: Standardized component patterns

### 4. Maintainability
- **Modular Architecture**: Easy to extend and modify
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear README and inline documentation
- **Error Handling**: Robust error boundaries and fallbacks

## Testing Strategy

### Unit Tests
- **Components**: Individual component testing
- **Hooks**: Custom hook testing
- **Utilities**: Helper function testing

### Integration Tests
- **API Integration**: RTK Query testing
- **Redux Store**: State management testing
- **Routing**: Navigation testing

### Test Coverage Requirements
- **Minimum Coverage**: 60% for all metrics
- **Branches**: 60%
- **Functions**: 60%
- **Lines**: 60%
- **Statements**: 60%

## Performance Optimizations

- **RTK Query**: Automatic caching and deduplication
- **React.memo**: Component memoization where beneficial
- **Lazy Loading**: Code splitting for better initial load
- **Image Optimization**: Lazy loading and error handling
- **Redux Persist**: Efficient local storage management

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please create an issue in the repository.

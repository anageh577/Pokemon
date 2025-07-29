# Pokemon Explorer App

A modern React TypeScript application that retrieves and displays Pokemon data from the PokeAPI. Built with Redux Toolkit, RTK Query, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.0.0-green)
![License](https://img.shields.io/badge/License-MIT-green)

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

## Quick Start

For experienced developers who want to get up and running quickly:

```bash
git clone https://github.com/yourusername/pokemon-explorer.git
cd pokemon-explorer
npm install
npm run dev
```

Visit `http://localhost:5173` to see the application.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pokemon-explorer.git
cd pokemon-explorer
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

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_POKEMON_API_BASE_URL` | Base URL for the Pokemon API | `https://pokeapi.co/api/v2` | No |
| `VITE_APP_TITLE` | Application title | `Pokemon Explorer` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |

Create a `.env.local` file in the root directory to override these values:

```bash
VITE_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
VITE_APP_TITLE=Pokemon Explorer
VITE_APP_VERSION=1.0.0
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

## Deployment

### Vercel (Recommended)

1. Connect your repository to [Vercel](https://vercel.com)
2. Set environment variables in Vercel dashboard:
   - `VITE_POKEMON_API_BASE_URL`
   - `VITE_APP_TITLE`
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables in Netlify dashboard

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Upload the `dist` folder to your web server

## Troubleshooting

### Common Issues

**Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**TypeScript errors**
```bash
npm run type-check
```

**Build fails**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tests failing**
```bash
npm run test:coverage
# Check for specific test failures
```

**Linting errors**
```bash
npm run lint:fix
```

**API connection issues**
- Verify your internet connection
- Check if PokeAPI is accessible: `curl https://pokeapi.co/api/v2/pokemon/`
- Ensure environment variables are set correctly

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - A powerful data fetching and caching tool
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities for React

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all linting checks pass
- Test on multiple browsers

## Roadmap

- [ ] Add Pokemon evolution chains
- [ ] Implement battle simulation
- [ ] Add user authentication
- [ ] Create mobile app version
- [ ] Add offline support
- [ ] Implement real-time updates
- [ ] Add social features (sharing, comments)

## Changelog

### [1.0.0] - 2024-01-01
- Initial release
- Pokemon list and detail views
- Search functionality
- Responsive design
- Comprehensive testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please:

1. Check the [troubleshooting section](#troubleshooting)
2. Search existing [issues](https://github.com/yourusername/pokemon-explorer/issues)
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokemon data
- [Pokemon Company](https://www.pokemon.com/) for the Pokemon franchise
- All contributors who have helped improve this project

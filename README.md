# Part Identifier Frontend

The frontend application for the Part Identifier system, built with React, TypeScript, and Material-UI.

## Component Structure

src/
├── components/ # Reusable components
├── pages/ # Page components
├── services/ # API services
├── hooks/ # Custom hooks
├── utils/ # Utility functions
├── types/ # TypeScript types
└── theme/ # MUI theme configuration


## Available Scripts

bash
Start development server
npm start
Build for production
npm run build
Run tests
npm test
Run linter
npm run lint
Run type checking
npm run type-check


## Environment Variables
Create a `.env` file in the frontend directory:
env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_IMAGE_UPLOAD_LIMIT=5242880


## Component Guidelines
- Use functional components with TypeScript
- Follow Material-UI best practices
- Implement responsive design for all components
- Use proper prop-types and interfaces

## State Management
- React Context for global state
- React Query for API state management
- Local state for component-specific state

## Testing
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing

## Styling
- Material-UI (MUI) for base components
- Styled-components for custom styling
- Follow the established theme in `src/theme`

## Performance Considerations
- Lazy loading for routes
- Image optimization
- Code splitting
- Memoization where necessary

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Follow the established code style
2. Write meaningful commit messages
3. Add proper documentation
4. Include tests where necessary
5. Update this README if needed

## Known Issues
See the Issues tab in the repository for current bugs and feature requests.

## Additional Resources
- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
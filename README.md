# Python Curriculum Tool

A constructivist Python learning environment built with Svelte frontend and FastAPI backend.

## 🚀 Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Requirements
The frontend expects a FastAPI backend running on:
- **Development**: `http://localhost:8080`
- **Production**: `https://pybuilderapi-production.up.railway.app`

## 🏗️ Architecture

### Frontend Components
- **PythonSandbox**: Main container managing WebSocket connection and state
- **PythonEditor**: Code input with real-time syntax highlighting
- **ExecuteButton**: Triggers code execution
- **PythonShell**: Displays Python output (mimics IDLE console)

### Key Technologies
- **Svelte/SvelteKit**: Frontend framework
- **TypeScript**: Type safety
- **Prism.js**: Python syntax highlighting
- **WebSockets**: Real-time communication with Python backend
- **CSS Flexbox**: Responsive layout

## 🎨 Design Decisions

### Syntax Highlighting
- **Dual-layer approach**: Hidden textarea for input, visible pre for highlighting
- **Prism.js integration**: Default theme for consistent colors
- **Font styling**: 18px, weight 600 for IDLE-like readability
- **Real-time updates**: Debounced highlighting on every keystroke

### Responsive Layout
- **Desktop**: Horizontal layout (Editor | Button | Shell)
- **Mobile**: Vertical layout (Editor → Button → Shell)
- **Execute button**: Centered between editor and shell
- **Flexbox-based**: Clean, maintainable CSS

### Styling Philosophy
- **No Tailwind CSS**: Removed for readable, maintainable CSS
- **Custom components**: Built from scratch for full control
- **IDLE-inspired**: Mimics Python's built-in development environment

## ⚙️ Configuration

### Environment Variables
Uses SvelteKit's built-in `import.meta.env.DEV` for:
- **Development**: Localhost endpoints
- **Production**: Railway deployment endpoints

### WebSocket Endpoints
- **Development**: `ws://localhost:8080/ws/python`
- **Production**: `wss://pybuilderapi-production.up.railway.app/ws/python`

### GraphQL Endpoints
- **Development**: `http://localhost:8080/graphql`
- **Production**: `https://pybuilderapi-production.up.railway.app/graphql`

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type checking
npm run format       # Format code with Prettier
npm run lint         # Check formatting
npm run test         # Run unit tests
```

### Code Quality
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Vitest**: Unit testing
- **ESLint**: Code linting (if configured)

## 📚 Lessons Learned

### Technical Insights
- **Textareas can't display HTML**: Required dual-layer approach for syntax highlighting
- **Prism.js themes affect alignment**: Default theme provides best cursor alignment
- **Svelte reactivity**: `bind:code` is cleaner than manual event dispatching
- **CSS layering**: Proper z-index management for overlapping elements

### Best Practices
- **Component composition**: Clean separation of concerns
- **State management**: Centralized in container components
- **Responsive design**: Mobile-first approach with Flexbox
- **Error handling**: Graceful WebSocket connection management

## 🎯 Current Status

✅ **Completed Features**
- Basic Svelte setup with TypeScript
- Python syntax highlighting with Prism.js
- Responsive layout (desktop/mobile)
- WebSocket integration for real-time execution
- Environment-based configuration
- Clean, maintainable codebase

🔄 **In Progress**
- Backend integration testing
- Error handling improvements
- Performance optimization

📋 **Future Enhancements**
- GraphQL integration for lesson content
- User authentication
- Code execution history
- Lesson progression tracking

## 📄 License

Creative Commons Attribution-NonCommercial 4.0 International License

## 🤝 Contributing

This is a learning project built manually to understand and maintain the codebase. Contributions should focus on:
- Code quality improvements
- Bug fixes
- Performance optimizations
- Documentation updates

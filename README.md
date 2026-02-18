# Trustie

**Verify AI with Real Sources**

Stop blindly trusting AI. Verify AI-generated content against trusted sources in seconds.

## Gold Standard Architecture

This codebase follows gold-standard software engineering principles:

### 1. Reliability
- ✅ Comprehensive error handling
- ✅ API retry logic with exponential backoff
- ✅ Error boundaries for graceful degradation
- ✅ Input validation and sanitization

### 2. Scalability
- ✅ Stateless API routes
- ✅ Modular component architecture
- ✅ Efficient data fetching patterns

### 3. Security
- ✅ Input sanitization (XSS prevention)
- ✅ URL validation
- ✅ Secure headers via Next.js config
- ✅ No sensitive data in client code

### 4. Maintainability
- ✅ Clean separation of concerns
- ✅ Feature-based folder structure
- ✅ Comprehensive TypeScript types
- ✅ Well-documented code

### 5. Performance
- ✅ Debounced inputs
- ✅ Memoized computations
- ✅ Efficient re-renders via hooks

### 6. Accessibility
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management in modals
- ✅ Screen reader support

### 7. Developer Experience
- ✅ TypeScript strict mode
- ✅ Path aliases (@/*)
- ✅ Consistent code style
- ✅ Clear documentation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (thin orchestration)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Components.tsx # Card, Badge, Tabs, etc.
│   ├── features/          # Feature-specific components
│   │   ├── search/
│   │   ├── verify/
│   │   ├── discover/
│   │   ├── help/
│   │   ├── rankings/
│   │   └── settings/
│   └── common/            # Shared components
│       ├── FeedbackBox.tsx
│       └── EmailPopup.tsx
├── hooks/                  # Custom React hooks
│   └── index.ts           # useSearch, useVerify, etc.
├── lib/
│   ├── api/               # API client with retry logic
│   ├── constants/         # All magic values
│   ├── utils/             # Pure utility functions
│   └── validation/        # Input validation
├── pages/api/             # API routes
│   ├── search.ts
│   ├── verify.ts
│   ├── rephrase.ts
│   └── rankings.ts
└── types/                 # TypeScript types
    └── index.ts
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/trustie.git
cd trustie

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start development server
npm run dev
```

### Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## Key Design Decisions

### 1. Custom Hooks for Business Logic
All business logic lives in custom hooks (`useSearch`, `useVerify`, etc.), keeping components focused on UI.

### 2. Type-Safe API Client
The API client uses TypeScript generics and Result types for type-safe error handling.

### 3. Validation First
All user input passes through validation before use. The validation module uses Result types for composable error handling.

### 4. Constants File
All magic values live in `lib/constants/index.ts`. No scattered magic strings.

### 5. Feature-Based Structure
Components are organized by feature rather than type, making it easy to find related code.

## API Routes

### POST /api/search
Search for trusted information.

### POST /api/verify
Verify AI-generated content.

### POST /api/rephrase
Rephrase text while preserving facts.

### GET/POST /api/rankings
Get or update AI rankings.

## Contributing

1. Follow the existing code patterns
2. Add types for new code
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

Proprietary - All rights reserved

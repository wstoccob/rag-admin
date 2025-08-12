# RAG Sources Admin Panel

A modern, scalable admin panel for managing RAG (Retrieval-Augmented Generation) sources built with Next.js, TypeScript, and Supabase.

## 🚀 Features

- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking
- **Form Validation**: Robust form validation using Zod schemas
- **Error Handling**: Comprehensive error handling and user feedback
- **Real-time Updates**: Live updates with toast notifications
- **Scalable Architecture**: Modular component structure for easy maintenance

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── DataTable.tsx     # Main data table
│   └── EditModal.tsx     # Edit modal
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── api.ts           # API client
│   ├── config.ts        # Configuration
│   ├── constants.ts     # Constants
│   ├── supabaseClient.ts # Supabase client
│   ├── utils.ts         # Utility functions
│   └── validation.ts    # Validation schemas
└── types/               # TypeScript type definitions
```

### Key Improvements Made

1. **Centralized Configuration**: Environment variables and app config centralized in `lib/config.ts`
2. **Type-Safe API Client**: Robust API client with proper error handling
3. **Reusable UI Components**: Modular, accessible UI components
4. **Custom Hooks**: Separation of business logic into custom hooks
5. **Validation Schemas**: Centralized validation using Zod
6. **Error Handling**: Comprehensive error handling throughout the app
7. **Constants Management**: All constants centralized for easy maintenance

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom component library
- **Notifications**: React Hot Toast
- **Icons**: Heroicons (SVG)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rag-admin
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

4. Run the development server:
```bash
pnpm dev
```

## 🔧 Configuration

### Environment Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key
- `NEXT_PUBLIC_API_URL`: Optional API base URL

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- `noUncheckedIndexedAccess`: Prevents unsafe array/object access
- `exactOptionalPropertyTypes`: Strict optional property handling
- `noImplicitReturns`: Ensures all code paths return values
- `noFallthroughCasesInSwitch`: Prevents switch fallthrough bugs

## 🎯 Usage

### Managing Sources

1. **View Sources**: The main page displays all RAG sources in a sortable table
2. **Edit Sources**: Click the "Edit" button to modify source metadata
3. **Real-time Updates**: Changes are reflected immediately with toast notifications

### API Endpoints

- `GET /api/sources`: Fetch all sources
- `PUT /api/sources/[id]`: Update a specific source

## 🧪 Development

### Code Quality

- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (recommended)

### Adding New Features

1. **New Components**: Add to `src/components/` or `src/components/ui/`
2. **New Hooks**: Add to `src/hooks/`
3. **New API Routes**: Add to `src/app/api/`
4. **New Types**: Add to `src/types/`

### Best Practices

- Use TypeScript strict mode
- Implement proper error handling
- Add validation for all user inputs
- Use the centralized API client
- Follow the established component patterns
- Add proper loading states
- Implement accessibility features

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, please open an issue in the GitHub repository or contact the development team.

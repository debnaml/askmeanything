# Ask Me Anything - AI Q&A Landing Page

A simple, responsive landing page designed to be accessed via QR code. Users can ask questions and receive AI-powered answers instantly.

## Features

- Clean, minimalist design optimized for mobile devices
- Large text input for easy typing on all devices
- AI-powered question answering
- "Ask Again" functionality for multiple questions
- Responsive design that works on desktop and mobile
- Easy deployment to Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your AI API key:
   - Copy `.env.example` to `.env.local`
   - Add your OpenAI API key to `.env.local`:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

Build the application for production:

```bash
npm run build
npm start
```

### Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add `OPENAI_API_KEY` with your API key
4. Deploy!

Alternatively, you can deploy directly using Vercel CLI:

```bash
npx vercel
```

## Customization

### Changing AI Provider

The application currently uses OpenAI's GPT-3.5-turbo. To use a different AI service:

1. Modify `src/app/api/ask/route.ts`
2. Update the API endpoint and request format
3. Update environment variables as needed

### Styling

The application uses Tailwind CSS for styling. Modify the classes in `src/app/page.tsx` to customize the appearance.

### QR Code Setup

Once deployed, you can generate a QR code pointing to your deployment URL using any QR code generator service.

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API

## Project Structure

```
src/
  app/
    api/ask/
      route.ts          # AI API endpoint
    globals.css         # Global styles
    layout.tsx          # Root layout
    page.tsx            # Main landing page
```

## Troubleshooting

### Node.js Version Issues

If you encounter syntax errors related to the nullish coalescing operator (`??=`), ensure you're using Node.js 18 or higher:

```bash
node --version
```

### API Key Issues

Make sure your OpenAI API key is correctly set in `.env.local` and has sufficient credits.

### Build Issues

If the build fails, try deleting `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```
# askmeanything
# askmeanything

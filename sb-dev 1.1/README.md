# SwiftBurst Food - Delivery Aggregator 🍔🚀

A modern application for comparing food delivery prices across multiple platforms to help users save money.

## Features

- Price comparison across major food delivery platforms
- Automatic promo code finder for maximum savings
- Payment method optimizer to suggest the best card for rewards
- User dashboard with savings analytics
- Restaurant listing and filtering
- Deal explorer for exclusive offers

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Bun package manager (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd swiftburst-food
bun install
# or npm install
```

3. Copy the environment variables example file:

```bash
cp .env.example .env.local
```

4. Set up your Supabase project:
   - Go to [Supabase](https://app.supabase.com/) and create a new project
   - Navigate to Project Settings > API
   - Copy your project URL and anon key
   - Update your `.env.local` file with these values

5. Run the development server:

```bash
bun run dev
# or npm run dev
```

## Deploying to Vercel

### Option 1: Deploy from GitHub

The easiest way to deploy to Vercel is directly from your GitHub repository:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: (leave as default)
   - Build Command: `bun run build` (or `npm run build`)
   - Output Directory: `.next`
6. Add environment variables from your `.env.local` file
7. Click "Deploy"

### Option 2: Deploy from CLI

You can also deploy directly from the command line:

1. Install the Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy the project:

```bash
vercel
```

4. Follow the prompts and configure your deployment options
5. To deploy to production:

```bash
vercel --prod
```

### Interfacing with the Front-End

Once deployed to Vercel, you can access and manage your project through:

1. **Vercel Dashboard**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Here you can view deployments, analytics, and manage settings

2. **Environment Variables**:
   - In your project dashboard, go to "Settings" > "Environment Variables"
   - Add or edit variables like your Supabase credentials

3. **Domains & URLs**:
   - Go to "Settings" > "Domains"
   - Add custom domains or use the default `.vercel.app` domain

4. **Deployment Preview**:
   - Each pull request to your GitHub repo will generate a preview deployment
   - Great for testing changes before they go to production

5. **Logs & Monitoring**:
   - View build logs, runtime logs, and performance metrics in the dashboard

## Modifying the Front-End Interface

The main files controlling the front-end interface are:

- `src/app/page.tsx` - The homepage
- `src/app/restaurants/page.tsx` - The restaurants listing page
- `src/app/dashboard/page.tsx` - The user dashboard
- `src/app/restaurants/[id]/compare/page.tsx` - The comparison page
- `src/components/layout/` - Contains header, footer, and main navigation components
- `src/components/ui/` - Contains reusable UI components

To modify the front-end:

1. Edit these files locally
2. Test your changes using `bun run dev`
3. Commit and push to GitHub
4. Vercel will automatically deploy the changes

## Supabase Integration

SwiftBurst uses Supabase for backend functionality. After deployment, ensure your Vercel environment has the correct Supabase environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License

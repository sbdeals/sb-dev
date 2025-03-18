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
- Bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd swiftburst-food
bun install
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
```

## Supabase Integration

SwiftBurst uses Supabase for backend functionality. Here's how to set it up:

### 1. Set up your Supabase project

1. Create a new project on [Supabase](https://app.supabase.com/)
2. Navigate to the SQL Editor and run the following schema to set up your tables:

```sql
-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  preferences JSONB
);

CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  cuisine TEXT[] NOT NULL,
  rating NUMERIC NOT NULL CHECK (rating >= 0 AND rating <= 5),
  platforms TEXT[] NOT NULL,
  address TEXT,
  distance TEXT
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES users(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  platform TEXT NOT NULL,
  items JSONB[] NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL,
  saved_amount NUMERIC
);

CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT NOT NULL,
  description TEXT NOT NULL,
  platform TEXT NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  discount_amount NUMERIC,
  discount_percentage NUMERIC,
  restaurant_id UUID REFERENCES restaurants(id)
);
```

### 2. Configure environment variables

1. Update your `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Generate TypeScript types (optional)

If you want to update the TypeScript types based on your schema:

1. Install the Supabase CLI
2. Login to Supabase CLI
3. Generate types:

```bash
supabase gen types typescript --project-id your-project-id > src/lib/supabase/types.ts
```

## Deployment

This project can be deployed to platforms like Vercel or Netlify:

1. Build the project:

```bash
bun run build
```

2. Deploy to your hosting provider
3. Set up environment variables in your hosting provider's dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License

# AI App 2025

A modern AI application built with Next.js and Rust, featuring a secure and performant architecture for AI chat interactions.

## Architecture

The application is split into two main components:

### Frontend (Next.js)
- Built with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Clerk Authentication for secure user management
- Streaming AI responses for optimal UX

### Backend (Rust)
- High-performance Rust server using Axum
- Direct OpenAI API integration
- CORS-enabled for frontend communication
- Async runtime with Tokio
- Environment configuration with dotenv

## Features

- 🔒 Secure authentication with Clerk
- 🤖 Real-time AI chat interface
- ⚡ High-performance Rust backend
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌊 Streaming responses for better UX
- 🌓 Dark/Light mode support
- 🔄 Real-time chat state management
- 🚀 API route protection with middleware

## Getting Started

### Frontend Setup

1. Navigate to the main directory
2. Create a `.env` file with:
   ```
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to `src-rust` directory
2. Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Install Rust if not already installed
4. Run the server:
   ```bash
   cargo run
   ```

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Clerk Authentication
- React Hot Toast
- AI SDK for streaming

### Backend
- Rust
- Axum web framework
- Tokio async runtime
- OpenAI API client
- Tower HTTP for CORS

## Development

The application follows a microservices-like architecture:

- Frontend runs on port 3000
- Rust backend runs on port 3001
- All AI interactions are handled by the Rust server
- Authentication is managed by Clerk
- Frontend communicates with backend via REST API
- Real-time streaming for chat responses

## Security

- Protected API routes with Clerk middleware
- Environment variables for sensitive data
- CORS configuration in Rust backend
- Type-safe API interactions
- Secure user session management

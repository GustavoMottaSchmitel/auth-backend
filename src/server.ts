import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { authRoutes } from './modules/auth/auth.routes.js';

const server = fastify({ logger: true });

// Register CORS
server.register(cors, {
  origin: [
    'https://central-atasistemas.duckdns.org',
    'https://api-elegibilidade.duckdns.org',
    'https://elegibilidade-atasistemas.duckdns.org',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Register Routes
server.register(authRoutes, { prefix: '/auth' });

// Health check
server.get('/health', async () => {
  return { status: 'ok', service: 'auth-backend' };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 4000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Auth Backend running on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

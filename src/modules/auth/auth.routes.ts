import type { FastifyInstance } from 'fastify';
import { loginHandler } from './auth.controller.js';
import { prisma } from '../../shared/database/prisma.js';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', loginHandler);
}

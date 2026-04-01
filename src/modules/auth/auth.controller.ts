import type { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../shared/database/prisma.js';

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as any;

  if (!email || !password) {
    return reply.status(400).send({ error: 'E-mail e senha são obrigatórios.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !user.ativo) {
    return reply.status(401).send({ error: 'Credenciais inválidas ou usuário inativo.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.senha_hash);
  
  if (!isValidPassword) {
    return reply.status(401).send({ error: 'Credenciais inválidas.' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, nome: user.nome },
    process.env.JWT_SECRET || 'central-ata-super-secret-key-2026',
    { expiresIn: '8h' }
  );

  return reply.send({
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    }
  });
}

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'master@atasistemas.com.br';
  const password = '@T@04499_';
  const hash = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      senha_hash: hash,
      role: 'ADMIN',
    },
    create: {
      email,
      nome: 'Administrador Master',
      senha_hash: hash,
      role: 'ADMIN',
      ativo: true,
    },
  });
  
  console.log('✅ Usuário Master criado com sucesso!');
  console.log(`Email: ${user.email}`);
  console.log(`Senha: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

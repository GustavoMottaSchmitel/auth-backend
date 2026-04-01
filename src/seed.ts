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
  console.log('--- Iniciando Seeding de Usuários ---');

  const defaultPassword = '@T@04499_';
  const masterPassword = 'C@sta1322075';

  const defaultHash = await bcrypt.hash(defaultPassword, 10);
  const masterHash = await bcrypt.hash(masterPassword, 10);

  const users = [
    // Suportes
    { nome: 'Suporte 01', email: 'suporte01@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 02', email: 'suporte02@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 03', email: 'suporte03@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 04', email: 'suporte04@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 05', email: 'suporte05@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 06', email: 'suporte06@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    { nome: 'Suporte 07', email: 'suporte07@atasistemas.com.br', password: defaultHash, role: 'SUPORTE' },
    
    // Coordenadores
    { nome: 'Adriano', email: 'adriano@atasistemas.com.br', password: defaultHash, role: 'COORDENADOR' },
    { nome: 'Ricardo', email: 'ricardo@atasistemas.com.br', password: defaultHash, role: 'COORDENADOR' },
    
    // Master
    { nome: 'Master User', email: 'master@atasistemas.com.br', password: masterHash, role: 'MASTER' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        nome: u.nome,
        senha_hash: u.password,
        role: u.role as any,
        ativo: true
      },
      create: {
        nome: u.nome,
        email: u.email,
        senha_hash: u.password,
        role: u.role as any,
        ativo: true
      },
    });
    console.log(`✅ Usuário setado: ${u.email} (${u.role})`);
  }

  console.log('--- Seeding Finalizado ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

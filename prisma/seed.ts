import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando Seeding de Usuários ---');

  const defaultPassword = '@T@04499_';
  const masterPassword = 'C@sta1322075';

  const defaultHash = await bcrypt.hash(defaultPassword, 10);
  const masterHash = await bcrypt.hash(masterPassword, 10);

  const users = [
    { nome: 'Suporte 01', email: 'suporte01@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 02', email: 'suporte02@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 03', email: 'suporte03@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 04', email: 'suporte04@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 05', email: 'suporte05@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 06', email: 'suporte06@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Suporte 07', email: 'suporte07@atasistemas.com.br', password: defaultHash, role: Role.SUPORTE },
    { nome: 'Adriano', email: 'adriano@atasistemas.com.br', password: defaultHash, role: Role.COORDENADOR },
    { nome: 'Ricardo', email: 'ricardo@atasistemas.com.br', password: defaultHash, role: Role.COORDENADOR },
    { nome: 'Master User', email: 'master@atasistemas.com.br', password: masterHash, role: Role.MASTER },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        nome: u.nome,
        senha_hash: u.password,
        role: u.role,
        ativo: true
      },
      create: {
        nome: u.nome,
        email: u.email,
        senha_hash: u.password,
        role: u.role,
        ativo: true
      },
    });
    console.log(`Usuário setado: ${u.email} (${u.role})`);
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
  });

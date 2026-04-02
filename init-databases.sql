-- Script de inicialização: cria os dois bancos separados
-- Este script roda automaticamente na primeira vez que o container sobe

-- Banco para autenticação (auth-backend / Prisma)
CREATE DATABASE auth_db;

-- O banco eligibility_db já é criado via POSTGRES_DB no docker-compose
-- Criar o schema auth dentro do auth_db
\c auth_db;
CREATE SCHEMA IF NOT EXISTS auth;

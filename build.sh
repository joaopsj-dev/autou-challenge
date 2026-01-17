#!/bin/bash

echo "🚀 Iniciando build do projeto..."

echo "📦 Instalando dependências do backend..."
cd backend
pip install -r requirements.txt

echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

echo "🔨 Construindo frontend..."
npm run build

echo "✅ Build concluído com sucesso!"

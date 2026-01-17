#!/bin/bash

echo "🔧 Configurando ambiente para desenvolvimento local..."

echo "📦 Instalando dependências do Python..."
cd backend
python -m venv venv
source venv/bin/activate || . venv/Scripts/activate
pip install -r requirements.txt

echo "📦 Instalando dependências do Node.js..."
cd ../frontend
npm install

echo "✅ Configuração concluída!"
echo ""
echo "Para iniciar o desenvolvimento:"
echo "1. Backend: cd backend && source venv/bin/activate && python app.py"
echo "2. Frontend: cd frontend && npm start"

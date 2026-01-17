#!/bin/bash

echo "🧪 Testando a aplicação Email Classifier..."
echo ""

API_URL="http://localhost:5000"

echo "1️⃣ Testando endpoint de health..."
curl -X GET "$API_URL/health" -w "\nStatus Code: %{http_code}\n\n"

echo "2️⃣ Testando classificação com texto produtivo..."
curl -X POST "$API_URL/api/classify" \
  -F 'text=Prezados, estou com um problema urgente no sistema. Preciso de suporte técnico imediato para resolver esta falha que está impedindo o processamento de transações.' \
  -w "\nStatus Code: %{http_code}\n\n"

echo ""
echo "3️⃣ Testando classificação com texto improdutivo..."
curl -X POST "$API_URL/api/classify" \
  -F 'text=Olá pessoal! Queria desejar um Feliz Natal a todos da equipe! Que 2024 seja um ano incrível.' \
  -w "\nStatus Code: %{http_code}\n\n"

echo ""
echo "4️⃣ Testando upload de arquivo..."
curl -X POST "$API_URL/api/classify" \
  -F "file=@EXEMPLO_EMAIL_PRODUTIVO.txt" \
  -w "\nStatus Code: %{http_code}\n\n"

echo ""
echo "✅ Testes concluídos!"

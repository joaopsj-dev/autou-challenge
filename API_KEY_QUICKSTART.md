# 🔑 GUIA RÁPIDO: API Key da OpenAI

## ⚡ Passo a Passo Simplificado

### 1️⃣ Criar Conta (2 minutos)
```
🌐 Acesse: https://platform.openai.com/signup

📧 Cadastre-se com:
   - Email + senha
   - OU Google/Microsoft/Apple

✅ Verifique seu email
```

### 2️⃣ Acessar Dashboard (1 minuto)
```
🌐 Login: https://platform.openai.com/

📊 Você verá o dashboard da API
```

### 3️⃣ Criar API Key (1 minuto)
```
🔑 Menu lateral → API Keys

➕ Clique em "Create new secret key"

✏️ Nome: "Email Classifier"

💾 Clique em "Create secret key"

⚠️ COPIE AGORA! A chave só aparece uma vez

📋 Formato: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 4️⃣ Configurar no Projeto (1 minuto)
```
📁 Crie: backend/.env

📝 Cole:
OPENAI_API_KEY=sk-proj-sua_chave_aqui
FLASK_ENV=development

💾 Salve o arquivo
```

---

## 💰 Créditos e Custos

### ✅ Novos Usuários
```
🎁 $5 em créditos GRATUITOS
⏰ Válido por 3 meses
🎯 Suficiente para ~3.333 classificações
```

### 💵 Modelo GPT-4o-mini
```
📊 Input:  $0.150 / 1M tokens
📊 Output: $0.600 / 1M tokens

📈 Exemplo de uso:
   - 1 classificação ≈ 300 tokens
   - 1000 classificações ≈ $0.045
   - Muito econômico! 💰
```

---

## 🔒 Segurança

### ✅ O QUE FAZER
```
✓ Guardar a chave em arquivo .env
✓ Adicionar .env ao .gitignore
✓ Usar variáveis de ambiente
✓ Configurar limites de uso
✓ Monitorar consumo
```

### ❌ NUNCA FAÇA
```
✗ Commitar a chave no Git
✗ Compartilhar publicamente
✗ Deixar hardcoded no código
✗ Usar em frontend (exposto)
✗ Enviar por email/chat
```

---

## 🎯 Alternativas Gratuitas

### Opção 1: Hugging Face
```python
from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="neuralmind/bert-base-portuguese-cased"
)
```
- ✅ 100% gratuito
- ❌ Menos preciso que GPT
- ⚙️ Requer modificações no código

### Opção 2: Google Gemini
```
🌐 https://makersuite.google.com/app/apikey
🎁 Gratuito com limites generosos
🔄 API similar à OpenAI
```

### Opção 3: Anthropic Claude
```
🌐 https://console.anthropic.com/
💰 Créditos iniciais gratuitos
🤖 Alternativa ao GPT
```

---

## 📊 Monitorar Uso

### Dashboard OpenAI
```
🌐 https://platform.openai.com/usage

📈 Veja:
   - Requisições por dia
   - Tokens consumidos
   - Custo acumulado
   - Limites restantes
```

### Configurar Alertas
```
⚙️ Settings → Billing → Usage limits

📧 Configure alertas para:
   - 50% do limite
   - 75% do limite
   - 90% do limite
```

---

## 🆘 Problemas Comuns

### ❌ "Incorrect API key"
```
🔍 Verificações:
   ✓ Chave copiada corretamente?
   ✓ Sem espaços extras?
   ✓ Arquivo .env na pasta certa?
   ✓ Formato sk-proj-xxx?

💡 Solução:
   Crie uma nova chave e teste
```

### ❌ "Exceeded quota"
```
🔍 Causa:
   Créditos acabaram

💡 Soluções:
   1. Adicionar método de pagamento
   2. Aguardar renovação mensal
   3. Usar modelo mais barato
```

### ❌ "Rate limit"
```
🔍 Causa:
   Muitas requisições rápidas

💡 Solução:
   Aguarde 1 minuto e tente novamente
```

---

## ✅ Checklist Final

Antes de começar, confirme:

- [ ] Conta OpenAI criada
- [ ] Email verificado
- [ ] API Key gerada
- [ ] Chave copiada e guardada
- [ ] Arquivo .env criado
- [ ] Chave colada no .env
- [ ] .env no .gitignore
- [ ] Aplicação testada localmente

---

## 🚀 Pronto para Começar!

Agora você tem tudo para executar o projeto:

1. ✅ API Key configurada
2. ✅ Créditos gratuitos disponíveis
3. ✅ Segurança implementada
4. ✅ Monitoramento configurado

### Próximo Passo:
```bash
cd backend
source venv/bin/activate
python app.py
```

---

**🎉 Boa sorte com o projeto!**

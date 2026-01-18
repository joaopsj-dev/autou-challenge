# Instruções de Deploy no Render

## Guia Completo para Hospedar a Aplicação

### Pré-requisitos

- Conta no GitHub com o repositório do projeto
- Conta no Render (gratuita): https://render.com/
- API Key da OpenAI configurada

---

## Passo 1: Preparar o Repositório

### 1.1 Verificar Arquivos Necessários

Certifique-se de que estes arquivos estão no repositório:
- ✅ `render.yaml`
- ✅ `build.sh`
- ✅ `Procfile`
- ✅ `runtime.txt`
- ✅ `backend/requirements.txt`
- ✅ `frontend/package.json`

### 1.2 Commit e Push

```bash
git add .
git commit -m "Preparar para deploy no Render"
git push origin main
```

---

## Passo 2: Criar Conta no Render

1. Acesse: https://render.com/
2. Clique em **Get Started for Free**
3. Faça login com GitHub (recomendado)
4. Autorize o Render a acessar seus repositórios

---

## Passo 3: Criar Novo Web Service

### 3.1 Iniciar Criação

1. No dashboard do Render, clique em **New +**
2. Selecione **Web Service**
3. Conecte seu repositório GitHub
4. Selecione o repositório `autou-desafio`

### 3.2 Configurar o Serviço

Preencha os campos:

**Name**: `email-classifier` (ou nome de sua preferência)

**Region**: `Oregon (US West)` (ou mais próximo de você)

**Branch**: `main`

**Root Directory**: (deixe em branco)

**Runtime**: `Python 3`

**Build Command**:
```bash
bash build.sh
```

**Start Command**:
```bash
cd backend && gunicorn --bind 0.0.0.0:$PORT app:app
```

**Instance Type**: `Free`

---

## Passo 4: Configurar Variáveis de Ambiente

### 4.1 Adicionar Variáveis

Na seção **Environment Variables**, clique em **Add Environment Variable**:

1. **OPENAI_API_KEY**
   - Key: `OPENAI_API_KEY`
   - Value: `sua_chave_api_da_openai`

2. **PYTHON_VERSION** (opcional)
   - Key: `PYTHON_VERSION`
   - Value: `3.11.0`

3. **NODE_VERSION** (opcional)
   - Key: `NODE_VERSION`
   - Value: `18`

### 4.2 Salvar Configurações

Clique em **Create Web Service**

---

## Passo 5: Aguardar o Deploy

### 5.1 Processo de Build

O Render executará:
1. ✅ Instalação das dependências Python
2. ✅ Instalação das dependências Node.js
3. ✅ Build do frontend React
4. ✅ Inicialização do servidor Flask

**Tempo estimado**: 5-10 minutos

### 5.2 Acompanhar Logs

Você pode acompanhar o processo em tempo real na aba **Logs**

---

## Passo 6: Testar a Aplicação

### 6.1 Acessar URL

Após o deploy, você receberá uma URL do tipo:
```
https://email-classifier-xxxx.onrender.com
```

### 6.2 Verificar Funcionamento

1. Acesse a URL no navegador
2. Teste o upload de um arquivo
3. Teste a inserção de texto direto
4. Verifique se a classificação funciona

---

## Passo 7: Configurar Domínio Customizado (Opcional)

### 7.1 Adicionar Domínio

1. Na página do serviço, vá em **Settings**
2. Clique em **Custom Domain**
3. Adicione seu domínio
4. Configure os registros DNS conforme instruído

---

## Troubleshooting

### Erro: Build Failed

**Causa**: Dependências não instaladas corretamente

**Solução**:
1. Verifique o arquivo `requirements.txt`
2. Certifique-se de que `build.sh` tem permissão de execução
3. Revise os logs de build

### Erro: Application Failed to Start

**Causa**: Servidor não está iniciando

**Solução**:
1. Verifique o comando de start
2. Confirme que o arquivo `app.py` existe
3. Revise os logs de runtime

### Erro: OpenAI API Error

**Causa**: API Key não configurada ou inválida

**Solução**:
1. Vá em **Environment** → **Environment Variables**
2. Verifique a variável `OPENAI_API_KEY`
3. Confirme que a chave está correta

### Site Muito Lento

**Causa**: Plano gratuito tem limitações

**Soluções**:
1. O serviço gratuito "dorme" após 15 minutos de inatividade
2. A primeira requisição pode demorar 30-60 segundos
3. Considere upgrade para plano pago se necessário

---

## Alternativas ao Render

Se preferir outras plataformas:

### Vercel
- Excelente para frontend
- Backend via serverless functions
- Deploy: https://vercel.com/

### Railway
- Interface moderna
- Configuração simples
- Deploy: https://railway.app/

### Replit
- IDE online integrada
- Deploy com um clique
- Deploy: https://replit.com/

### Heroku
- Tradicional e robusto
- Plano gratuito limitado
- Deploy: https://heroku.com/

---

## Manutenção e Atualizações

### Atualizar Aplicação

1. Faça suas alterações localmente
2. Commit e push para o GitHub
3. O Render fará deploy automático

### Configurar Auto-Deploy

1. Vá em **Settings**
2. Em **Build & Deploy**
3. Ative **Auto-Deploy**

### Monitorar Performance

1. Acesse a aba **Metrics**
2. Monitore CPU, memória e requisições
3. Configure alertas se necessário

---

## Custos

### Plano Free (Gratuito)
- ✅ 750 horas/mês
- ✅ Adequado para projetos pessoais
- ❌ Serviço "dorme" após inatividade
- ❌ Performance limitada

### Plano Starter ($7/mês)
- ✅ Sem "sleep"
- ✅ Melhor performance
- ✅ SSL customizado
- ✅ Suporte prioritário

---

## Suporte

- Documentação: https://render.com/docs
- Community: https://community.render.com/
- Status: https://status.render.com/

---

**Sucesso no seu deploy! 🚀**

import os
from openai import OpenAI
import json

client = None

def initialize_openai():
    global client
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError('OPENAI_API_KEY não encontrada nas variáveis de ambiente')
    
    client = OpenAI(api_key=api_key)

def classify_and_respond(email_text):
    if client is None:
        initialize_openai()
    
    system_prompt = """Você é um assistente especializado em classificar emails corporativos.

INSTRUÇÕES DE CLASSIFICAÇÃO:

SPAM - Emails suspeitos, fraudulentos ou indesejados (PRIORIDADE MÁXIMA):
✓ Promessas de dinheiro fácil, prêmios, loteria
✓ Phishing (tentativas de roubo de dados/senha)
✓ Links suspeitos ou encurtados sem contexto
✓ Ofertas "bom demais para ser verdade"
✓ Erros gramaticais excessivos em contexto comercial
✓ Urgência exagerada ("Clique agora!", "Última chance!")
✓ Vendas não solicitadas agressivas
✓ Correntes, pirâmides, esquemas
✓ Emails de bancos/serviços pedindo senha ou dados sensíveis
✓ Remetentes desconhecidos com propostas suspeitas

PRODUTIVO - Emails legítimos que REQUEREM ação, resposta ou decisão:
✓ Solicitações de informações específicas
✓ Ofertas de trabalho, vagas, oportunidades LEGÍTIMAS
✓ Pedidos que exigem resposta com dados/documentos
✓ Suporte técnico, problemas, erros, bugs
✓ Dúvidas sobre processos, sistemas, serviços
✓ Atualizações que requerem confirmação
✓ Convites que precisam de RSVP
✓ Questões que exigem decisão ou ação
✓ Emails com lista de perguntas a responder
✓ Qualquer email que termine esperando uma resposta ou ação

IMPRODUTIVO - Emails legítimos que NÃO requerem ação imediata:
✓ Felicitações (aniversário, natal, ano novo)
✓ Agradecimentos simples sem perguntas
✓ Mensagens sociais/cordialidades
✓ Avisos informativos sem ação necessária

ATENÇÃO: 
1. Se o email parece SPAM → classificar como "Spam"
2. Se o email pede informações/ação legítima → classificar como "Produtivo"
3. Caso contrário → classificar como "Improdutivo"

Responda APENAS com um JSON válido no formato:
{
  "category": "Spam", "Produtivo" ou "Improdutivo",
  "response": "texto da resposta apropriada (se Spam, avisar sobre o risco)",
  "confidence": "alta", "média" ou "baixa",
  "sender": "nome do remetente se identificável, ou null",
  "sender_email": "email do remetente se identificável, ou null",
  "recipient": "nome do destinatário se identificável, ou null",
  "recipient_email": "email do destinatário se identificável, ou null"
}"""

    user_prompt = f"""Analise o seguinte email e forneça a classificação e resposta.

IMPORTANTE: Extraia as seguintes informações se disponíveis no texto:
- Nome do remetente (quem enviou)
- Email do remetente (formato: usuario@dominio.com)
- Nome do destinatário (para quem foi enviado)
- Email do destinatário (formato: usuario@dominio.com)

EMAIL:
{email_text}

Lembre-se de responder APENAS com o JSON solicitado."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            max_tokens=600
        )
        
        content = response.choices[0].message.content.strip()
        
        if content.startswith('```json'):
            content = content[7:]
        if content.startswith('```'):
            content = content[3:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        
        result = json.loads(content)
        
        if 'category' not in result or 'response' not in result:
            raise ValueError('Resposta da IA não contém campos necessários')
        
        if result['category'] not in ['Spam', 'Produtivo', 'Improdutivo']:
            raise ValueError('Categoria inválida retornada pela IA')
        
        if 'confidence' not in result:
            result['confidence'] = 'média'
        
        if 'sender' not in result:
            result['sender'] = None
        
        if 'sender_email' not in result:
            result['sender_email'] = None
        
        if 'recipient' not in result:
            result['recipient'] = None
        
        if 'recipient_email' not in result:
            result['recipient_email'] = None
        
        return result
        
    except json.JSONDecodeError as e:
        raise ValueError(f'Erro ao processar resposta da IA: {str(e)}')
    except Exception as e:
        raise Exception(f'Erro ao chamar API da OpenAI: {str(e)}')

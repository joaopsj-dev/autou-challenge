import random
import re

def initialize_openai():
    pass

def extract_sender_recipient(email_text):
    sender = None
    recipient = None
    
    sender_patterns = [
        r'De:\s*([^\n<]+)',
        r'From:\s*([^\n<]+)',
        r'Remetente:\s*([^\n<]+)',
        r'Emerson\s+da\s+Silva',
        r'At\.te,\s*([^\n]+)',
        r'Atenciosamente,\s*([^\n]+)',
    ]
    
    recipient_patterns = [
        r'Para:\s*([^\n<]+)',
        r'To:\s*([^\n<]+)',
        r'Destinatário:\s*([^\n<]+)',
        r'Prezado[a]?\s+([^\n,]+)',
        r'Caro[a]?\s+([^\n,]+)',
    ]
    
    for pattern in sender_patterns:
        match = re.search(pattern, email_text, re.IGNORECASE)
        if match:
            sender = match.group(1).strip()
            break
    
    for pattern in recipient_patterns:
        match = re.search(pattern, email_text, re.IGNORECASE)
        if match:
            recipient = match.group(1).strip()
            break
    
    return sender, recipient

def classify_and_respond(email_text):
    keywords_produtivo = [
        'urgente', 'problema', 'suporte', 'erro', 'ajuda', 'técnico',
        'bug', 'falha', 'dúvida', 'questão', 'solicitação', 'requisição',
        'status', 'atualização', 'caso', 'sistema', 'não funciona',
        'preciso', 'necessário', 'como', 'quando', 'onde', 'resolver',
        'vaga', 'estágio', 'oportunidade', 'candidatar', 'informações',
        'peço que', 'me envie', 'qual', 'informe', 'pode nos informar',
        'responda', 'confirme', 'nos informe', 'gostaria de saber',
        'necessito', 'favor', 'por gentileza', 'preciso de', 'aguardo'
    ]
    
    keywords_improdutivo = [
        'feliz natal', 'feliz ano novo', 'parabéns pelo', 'obrigado por tudo',
        'muito obrigado pela', 'agradecimento especial', 'congratulações',
        'aniversário feliz', 'sucesso sempre', 'felicitações pelo'
    ]
    
    text_lower = email_text.lower()
    
    has_questions = '?' in email_text
    has_request = any(word in text_lower for word in ['peço', 'favor', 'solicito', 'preciso', 'necessário'])
    has_form = text_lower.count('qual') >= 2 or text_lower.count('informe') >= 1
    
    produtivo_count = sum(1 for k in keywords_produtivo if k in text_lower)
    improdutivo_count = sum(1 for k in keywords_improdutivo if k in text_lower)
    
    if has_questions or has_request or has_form:
        produtivo_count += 5
    
    if produtivo_count > improdutivo_count:
        category = "Produtivo"
        responses_produtivo = [
            "Prezado(a), recebemos sua solicitação e nossa equipe técnica irá analisá-la em breve. Entraremos em contato com mais informações assim que possível. Agradecemos pela paciência.",
            "Olá! Sua solicitação foi registrada com sucesso. Nossa equipe de suporte está trabalhando para resolver sua questão. Você receberá uma atualização em breve.",
            "Caro(a) usuário(a), agradecemos por entrar em contato. Estamos analisando o problema reportado e retornaremos com uma solução o mais rápido possível.",
        ]
        response = random.choice(responses_produtivo)
        confidence = "alta" if produtivo_count >= 3 else "média"
    elif improdutivo_count > produtivo_count:
        category = "Improdutivo"
        responses_improdutivo = [
            "Muito obrigado pela sua mensagem! Ficamos muito felizes com seu contato e desejamos tudo de bom. Um grande abraço da equipe!",
            "Que mensagem gentil! Agradecemos imensamente suas palavras. Desejamos sucesso e felicidades para você também!",
            "Olá! Obrigado por compartilhar esse momento conosco. Ficamos muito gratos pela sua mensagem. Um forte abraço!",
        ]
        response = random.choice(responses_improdutivo)
        confidence = "alta" if improdutivo_count >= 2 else "média"
    else:
        if len(email_text) > 100:
            category = "Produtivo"
            response = "Prezado(a), recebemos sua mensagem. Nossa equipe está analisando o conteúdo e retornará em breve com uma resposta apropriada."
            confidence = "média"
        else:
            category = "Improdutivo"
            response = "Obrigado pelo contato! Ficamos felizes em receber sua mensagem."
            confidence = "baixa"
    
    sender, recipient = extract_sender_recipient(email_text)
    
    return {
        "category": category,
        "response": response,
        "confidence": confidence,
        "sender": sender,
        "recipient": recipient
    }

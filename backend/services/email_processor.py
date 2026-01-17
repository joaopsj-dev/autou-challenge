import re
import unicodedata

def clean_text(text):
    text = unicodedata.normalize('NFKD', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text

def preprocess_email(text):
    text = clean_text(text)
    
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '[URL]', text)
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[EMAIL]', text)
    text = re.sub(r'\b\d{2,}\b', '[NUMERO]', text)
    
    return text

def extract_key_info(text):
    keywords_produtivo = [
        'solicitação', 'suporte', 'técnico', 'problema', 'erro', 'ajuda',
        'dúvida', 'questão', 'status', 'atualização', 'requisição', 'caso',
        'urgente', 'sistema', 'falha', 'bug', 'preciso', 'necessário'
    ]
    
    keywords_improdutivo = [
        'feliz', 'parabéns', 'obrigado', 'agradecimento', 'natal', 'ano novo',
        'aniversário', 'congratulações', 'sucesso', 'felicitações'
    ]
    
    text_lower = text.lower()
    
    produtivo_count = sum(1 for keyword in keywords_produtivo if keyword in text_lower)
    improdutivo_count = sum(1 for keyword in keywords_improdutivo if keyword in text_lower)
    
    return {
        'produtivo_score': produtivo_count,
        'improdutivo_score': improdutivo_count,
        'text_length': len(text),
        'word_count': len(text.split())
    }

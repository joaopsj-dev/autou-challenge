import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from services.email_processor import preprocess_email, extract_key_info
from services.ai_classifier import classify_and_respond, initialize_openai
from utils.file_handler import allowed_file, extract_text_from_file, validate_file_size

load_dotenv()

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

try:
    initialize_openai()
except Exception as e:
    print(f"Aviso: Não foi possível inicializar OpenAI - {str(e)}")

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'message': 'API de Classificação de Emails está funcionando'
    }), 200

@app.route('/api/classify', methods=['POST'])
def api_classify():
    return classify_email()

def classify_email():
    try:
        email_text = None
        
        if 'file' in request.files:
            file = request.files['file']
            
            if file.filename == '':
                return jsonify({'error': 'Nenhum arquivo selecionado'}), 400
            
            if not allowed_file(file.filename):
                return jsonify({'error': 'Formato de arquivo não permitido. Use .txt ou .pdf'}), 400
            
            try:
                validate_file_size(file)
                email_text = extract_text_from_file(file)
            except ValueError as e:
                return jsonify({'error': str(e)}), 400
            except Exception as e:
                return jsonify({'error': f'Erro ao processar arquivo: {str(e)}'}), 500
        
        elif request.is_json and 'text' in request.json:
            email_text = request.json['text']
        
        elif 'text' in request.form:
            email_text = request.form['text']
        
        else:
            return jsonify({'error': 'Nenhum email fornecido. Envie um arquivo ou texto.'}), 400
        
        if not email_text or len(email_text.strip()) == 0:
            return jsonify({'error': 'O conteúdo do email está vazio'}), 400
        
        if len(email_text) < 10:
            return jsonify({'error': 'Email muito curto. Forneça um conteúdo mais substancial.'}), 400
        
        processed_text = preprocess_email(email_text)
        key_info = extract_key_info(email_text)
        
        result = classify_and_respond(email_text)
        
        response_data = {
            'success': True,
            'category': result['category'],
            'response': result['response'],
            'confidence': result.get('confidence', 'média'),
            'sender': result.get('sender'),
            'recipient': result.get('recipient'),
            'email_content': email_text[:500],
            'stats': {
                'original_length': len(email_text),
                'word_count': key_info['word_count'],
                'produtivo_indicators': key_info['produtivo_score'],
                'improdutivo_indicators': key_info['improdutivo_score']
            }
        }
        
        return jsonify(response_data), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Erro no processamento: {str(e)}'}), 500

@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'Arquivo muito grande. Tamanho máximo: 5MB'}), 413

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint não encontrado'}), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_ENV') == 'development')

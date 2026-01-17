import os
from PyPDF2 import PdfReader
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'txt', 'pdf'}
MAX_FILE_SIZE = 5 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_file(file):
    filename = secure_filename(file.filename)
    file_ext = filename.rsplit('.', 1)[1].lower()
    
    if file_ext == 'txt':
        return file.read().decode('utf-8', errors='ignore')
    
    elif file_ext == 'pdf':
        pdf_reader = PdfReader(file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    raise ValueError('Formato de arquivo não suportado')

def validate_file_size(file):
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise ValueError('Arquivo muito grande. Tamanho máximo: 5MB')
    
    return True

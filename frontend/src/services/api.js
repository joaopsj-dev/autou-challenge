import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

export const classifyEmail = async (data) => {
  try {
    const formData = new FormData();
    
    if (data.file) {
      formData.append('file', data.file);
    } else if (data.text) {
      formData.append('text', data.text);
    }
    
    const response = await axios.post(`${API_URL}/api/classify`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao classificar email');
    } else if (error.request) {
      throw new Error('Erro de conexão com o servidor');
    } else {
      throw new Error('Erro ao processar requisição');
    }
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    throw new Error('Servidor não está respondendo');
  }
};

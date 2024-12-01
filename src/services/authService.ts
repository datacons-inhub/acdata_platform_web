import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const authenticate = async (): Promise<string> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/v1/auth/login`, {
      username: 'UserTest',
      email: 'acdata.process@acme.com',
      password: 'EasyPass',
    });

    const token = response.data.access_token;
    localStorage.setItem('access_token', token); // Guardar el token en el almacenamiento local
    return token;
  } catch (error: any) {
    console.error('Error en autenticación:', error.response?.data || error.message);
    throw new Error('No se pudo autenticar el usuario.');
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

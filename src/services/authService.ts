import axios, { AxiosError } from 'axios';
import logger from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const USERNAME = import.meta.env.VITE_USERNAME || 'UserTest';
const PASSWORD = import.meta.env.VITE_PASSWORD || 'EasyPass';

interface AuthResponse {
  access_token: string;
  token_type: string;
}

//let token: string | null = null;
let cachedToken: string | null = null;

logger.info(`${API_BASE_URL}/auth/login`);

export const login = async (): Promise<string> => {
  logger.info('Authenticating...');
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
      username: USERNAME,
      password: PASSWORD,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    cachedToken = response.data.access_token;
    localStorage.setItem('access_token', cachedToken);
    logger.info('Authentication successful');
    return cachedToken;

  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        logger.error(`Error: ${error.response.status} - ${error.response.data.detail}`);
      } else {
        logger.error('Unknown error:', error.message);
      }
    } else {
      logger.error('Unknown error:', error);
    }
    throw new Error('Authentication failed');
  }
};

export const getToken = (): string | null => {
  //return token || localStorage.getItem('access_token');
  if (!cachedToken) {
    cachedToken = localStorage.getItem('access_token');
  }
  return cachedToken;
};
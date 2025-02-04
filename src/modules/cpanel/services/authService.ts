import { ENV } from '../../../config';
import { setToken } from './apiClient';

let isAuthenticated = false;

export async function authenticate(): Promise<void> {

  console.log('[AUTHSERVICE Calling...] ');

  if (isAuthenticated) return;

  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', ENV.USERNAME);
  params.append('password', ENV.PASSWORD);
  // Si son requeridos client_id, client_secret o scope, añadirlos aquí:
  params.append('scope', '');
  params.append('client_id', 'string');
  params.append('client_secret', 'string');

  const response = await fetch(`${ENV.API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  //console.log('[Deleteme] AUTH RESPONSE response:', response);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('[ERROR]: Auth failed', errorText);
    throw new Error(`Auth failed: ${response.statusText}`);
  }

  const data = await response.json();
  //console.log('[Deleteme] AUTH DATA data:', data);

  if(data && data.access_token){
    const token = data.access_token; // según la respuesta mostrada en la imagen
    setToken(token);
    isAuthenticated = true;
  }else {
    throw new Error('No token returned from auth');
  }
}


export function logout() {
  setToken(null);
  isAuthenticated = false;
}

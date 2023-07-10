import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((request) => {
      if (request.url !== '/api/login/') {
  request.headers['Authorization'] = 'Token ' + localStorage.getItem('authToken');
      }
  return request;
});

export async function getTicketThreads() {
  const response = await api.get('/api/ticket-threads/');
  return response.data;
}

export async function getTickets() {
  const response = await api.get('/api/tickets/');
  return response.data;
}

export async function getUserInfo() {
  const response = await api.get('/api/userinfo/');
  return response.data;
}

export async function createComment(ticketId: number, text: string, userId: number | null) {
  const response = await api.post('/api/comments/', { ticket: ticketId, text: text, user:userId });
  return response.data;
}

export async function login(username: string, password: string) {
      console.log('Attempting login...'); // add this line
  try {
    const response = await api.post('/api/login/', { username, password });
        console.log('Login response received:', response.data); // add this line
    if (response.data.token) {
    console.log(response.data)
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function logout() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found');
  }

  await api.post('/api/logout/');

  // After logging out, remove the auth token
  localStorage.removeItem('authToken');
}
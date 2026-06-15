import axios from 'axios';

// Use EXPO_PUBLIC_ prefix for environment variables in Expo
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000'; // 10.0.2.2 is localhost for Android emulator

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// React Native uses an object with uri, type, and name for file uploads
export interface RNFile {
  uri: string;
  type: string;
  name: string;
}

export const soilApi = {
  upload: async (file: RNFile) => {
    const formData = new FormData();
    formData.append('file', file as any);
    const response = await api.post('/soil/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getReport: async (id: number | string) => {
    const response = await api.get(`/soil/report/${id}`);
    return response.data;
  },
  getReports: async () => {
    const response = await api.get('/soil/reports');
    return response.data;
  }
};

export const weatherApi = {
  getCurrent: async (lat: number, lon: number) => {
    const response = await api.get('/weather/current', { params: { lat, lon } });
    return response.data;
  },
  getForecast: async (lat: number, lon: number) => {
    const response = await api.get('/weather/forecast', { params: { lat, lon } });
    return response.data;
  }
};

export const cropApi = {
  uploadImage: async (fieldId: string, file: RNFile) => {
    const formData = new FormData();
    formData.append('field_id', fieldId);
    formData.append('file', file as any);
    const response = await api.post('/crop/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getField: async (fieldId: string) => {
    const response = await api.get(`/crop/${fieldId}`);
    return response.data;
  },
  getFields: async () => {
    const response = await api.get('/crop/fields');
    return response.data;
  }
};

export const diseaseApi = {
  analyze: async (file: RNFile) => {
    const formData = new FormData();
    formData.append('file', file as any);
    const response = await api.post('/disease/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getResult: async (id: number | string) => {
    const response = await api.get(`/disease/result/${id}`);
    return response.data;
  },
  getReports: async () => {
    const response = await api.get('/disease/reports');
    return response.data;
  }
};

export const chatApi = {
  send: async (message: string) => {
    const response = await api.post('/chat', { message });
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  }
};

export const profileApi = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  update: async (data: any) => {
    const response = await api.put('/profile', data);
    return response.data;
  }
};

export const contactApi = {
  submit: async (data: any) => {
    const response = await api.post('/contact', data);
    return response.data;
  },
  getMessages: async () => {
    const response = await api.get('/contact/messages');
    return response.data;
  }
};

export const settingsApi = {
  get: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
  update: async (data: any) => {
    const response = await api.put('/settings', data);
    return response.data;
  }
};

export const marketApi = {
  getPrices: async () => {
    const response = await api.get('/market/prices');
    return response.data;
  }
};

export const dashboardApi = {
  get: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};

export default api;

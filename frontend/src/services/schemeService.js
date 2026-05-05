import api from './api';

export const schemeService = {
  getAllSchemes: (params) => api.get('/schemes', { params }),
  getSchemeById: (id) => api.get(`/schemes/${id}`),
  createScheme: (data) => api.post('/schemes', data),
  updateScheme: (id, data) => api.put(`/schemes/${id}`, data),
  deleteScheme: (id) => api.delete(`/schemes/${id}`),
  getRecommended: () => api.get('/schemes/recommended'),
};

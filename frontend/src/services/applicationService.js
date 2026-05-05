import api from './api';

export const applicationService = {
  applyForScheme: (data) => api.post('/applications', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserApplications: () => api.get('/applications/user'),
  getAllApplications: (params) => api.get('/applications', { params }),
  updateApplicationStatus: (id, status) => api.patch(`/applications/${id}`, { status }),
  getApplicationById: (id) => api.get(`/applications/${id}`),
};

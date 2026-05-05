import api from './api';

export const bookmarkService = {
  toggleBookmark: (schemeId) => api.post('/bookmarks/toggle', { schemeId }),
  getBookmarkedSchemes: () => api.get('/bookmarks'),
};

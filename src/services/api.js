import axios from 'axios';

const API_BASE_URL = 'https://batmath-backend-ovo1-git-main-ahmed-alis-projects-588ffe47.vercel.app/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookie-based auth
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

class ApiService {
  async request(endpoint, options = {}) {
    const config = {
      url: endpoint,
      method: options.method || 'GET',
      ...options,
    };

    return apiClient(config);
  }

  // Quiz endpoints
  async getQuizzes(params = {}) {
    return this.get('/quizzes', params);
  }

  async getQuiz(id) {
    return this.get(`/quizzes/${id}`);
  }

  async getQuizQuestions(quizId) {
    return this.get(`/quizzes/${quizId}/questions`);
  }

  async submitQuiz(quizId, answers) {
    return this.post(`/quizzes/${quizId}/submit`, { answers });
  }

  async getQuizResults(quizId) {
    return this.get(`/quizzes/${quizId}/results`);
  }

  // Session endpoints
  async getSessions(params = {}) {
    return this.get('/sessions', params);
  }

  async getSession(id) {
    return this.get(`/sessions/${id}`);
  }

  async getSessionsByCourse(courseId) {
    return this.get('/sessions', { course: courseId });
  }

  // Question endpoints
  async getQuestion(id) {
    return this.get(`/questions/${id}`);
  }

  // Auth endpoints
  async getProfile() {
    return this.get('/users/me');
  }

  async updateProfile(updates) {
    return this.put('/users/update', updates);
  }

  async changePassword(passwordData) {
    return this.put('/users/change-password', passwordData);
  }

  // Course endpoints
  async getCourses(params = {}) {
    return this.get('/courses', params);
  }

  async getCourse(id) {
    return this.get(`/courses/${id}`);
  }

  // Book endpoints
  async getBooks(params = {}) {
    return this.get('/books', params);
  }

  async getBook(id) {
    return this.get(`/books/${id}`);
  }

  async createBook(bookData) {
    return this.post('/books', bookData);
  }

  async updateBook(id, updates) {
    return this.put(`/books/${id}`, updates);
  }

  async deleteBook(id) {
    return this.delete(`/books/${id}`);
  }

  async uploadBookCover(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request(`/books/${id}/upload-cover`, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async uploadBookPdf(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request(`/books/${id}/upload-pdf`, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async adjustBookInventory(id, delta) {
    return this.post(`/books/${id}/adjust-inventory`, { delta });
  }

  async getPdfDownloadUrl(id) {
    return this.get(`/books/${id}/pdf-url`);
  }

  async downloadPdf(id) {
    return this.get(`/books/${id}/download-pdf`);
  }

  // Generic methods for different HTTP verbs
  async get(endpoint, params = {}) {
    return this.request(endpoint, {
      method: 'GET',
      params: params
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      data: data
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      data: data
    });
  }

  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      data: data
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Method to set auth token if needed
  setAuthToken(token) {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }

  // Method to clear auth token
  clearAuthToken() {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

export default new ApiService();

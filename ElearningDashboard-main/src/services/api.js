import axios from 'axios';

const API_BASE_URL = 'http://localhost:7028/api'; 

export const testApiConnection = async () => {
  try {
      await axios.get(`${API_BASE_URL}/health-check`);
      console.log(' API Connection Successful!', 'color: green; font-weight: bold;');
  } catch (error) {
      console.error(' API Connection Failed!', 'color: red; font-weight: bold;', error.message);
  }
};
// Register a New User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Registration Error:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        return { token, user };
    } catch (error) {
        console.error('Login Error:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Fetch Courses
export const fetchCourses = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/Courses`);
      return response.data;
  } catch (error) {
      console.error('Error fetching courses:', error);
      throw error.response ? error.response.data : error.message;
  }
};

// Fetch Quizzes
export const fetchQuizzes = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/quizzes`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Fetch Enrollments
export const fetchEnrollments = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/enrollment/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Fetch Progress (Renamed to `progressApi` as requested)
export const progressApi = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/progress/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Helper Function to Logout
export const logoutUser = () => {
    localStorage.removeItem('token');
};

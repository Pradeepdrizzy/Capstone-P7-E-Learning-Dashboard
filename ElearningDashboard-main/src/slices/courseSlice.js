// slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses } from '../services/api';

const initialState = {
  courses: [],
  course: null,
  loading: false,
  error: null
};

// Define async thunks
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCourses();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourse = createAsyncThunk(
  'courses/fetchById',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await fetchCourses();
      const selectedCourse = response.find(course => course.CourseId === courseId);
      if (!selectedCourse) throw new Error('Course not found');
      return selectedCourse;
    } catch (error) {
      return rejectWithValue(error.message || 'Course not found');
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  'courses/enroll',
  async (enrollmentData, { rejectWithValue }) => {
    try {
      // Assuming enrollment logic is handled within your API or database
      return { success: true, courseId: enrollmentData.courseId };
    } catch (error) {
      return rejectWithValue(error.message || 'Enrollment failed');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        // Update courses state if needed
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default courseSlice.reducer;

import axiosInstance from './axiosConfig';
import { NOTES_ENDPOINTS, TODO_ENDPOINTS,AUTH_ENDPOINTS, USER_ENDPOINTS } from '../Constants/APICONSTANTS';

export const authAPI = {
  login: (credentials) => axiosInstance.post(AUTH_ENDPOINTS.LOGIN_USER, credentials),
  register: (userData) => axiosInstance.post(AUTH_ENDPOINTS.REGISTER_USER, userData),
};

export const notesAPI = {
  // Get all notes (admin)
  getAllNotes: () => axiosInstance.get(NOTES_ENDPOINTS.ALL_NOTES),

  // Get user notes with pagination
  getUserNotes: (pageNo = 0, pageSize = 9) => 
    axiosInstance.get(`${NOTES_ENDPOINTS.USER_NOTES}?pageNo=${pageNo}&pageSize=${pageSize}`),

  // Search notes
  searchNotes: (pageNo = 0, pageSize = 9, keyword = '') => 
    axiosInstance.get(`${NOTES_ENDPOINTS.SEARCH_NOTES}?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`),

  // Save/Create note
  saveNote: (formData) => 
    axiosInstance.post(NOTES_ENDPOINTS.SAVE_NOTES, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Delete note (soft delete - moves to recycle bin)
  deleteNote: (id) => axiosInstance.get(`${NOTES_ENDPOINTS.DELETE_NOTES}/${id}`),

  // Restore note from recycle bin
  restoreNote: (id) => axiosInstance.get(`${NOTES_ENDPOINTS.RESTORE_NOTES}/${id}`),

  // Download file attachment
  downloadFile: (id) => 
    axiosInstance.get(`${NOTES_ENDPOINTS.DOWNLOAD_NOTES}/${id}`,
    { responseType: 'blob',transformResponse: (r) => r },
),

  // Get recycle bin notes
  getRecycleNotes: () => axiosInstance.get(NOTES_ENDPOINTS.RECYCLE_NOTES),

  // Delete note from recycle bin (hard delete)
  deleteNoteFromRecycle: (id) => 
    axiosInstance.delete(`${NOTES_ENDPOINTS.RECYCLE_DELETE_NOTES}/${id}`),

  // Delete all notes from recycle bin
  deleteAllFromRecycle: () => 
    axiosInstance.delete(NOTES_ENDPOINTS.RECYCLE_ALL_DELETE_NOTES),

  // Add to favorites
  addToFavorites: (notesId) => 
    axiosInstance.post(`${NOTES_ENDPOINTS.SAVE_FAV_NOTES}/${notesId}`),

  // Remove from favorites
  removeFromFavorites: (favnotesId) => 
    axiosInstance.post(`${NOTES_ENDPOINTS.UNFAV_NOTES}${favnotesId}`),

  // Get all favorite notes
  getAllFavorites: () => axiosInstance.get(NOTES_ENDPOINTS.ALL_FAV_NOTES),

  // Copy/Duplicate note
  copyNote: (id) => axiosInstance.post(`${NOTES_ENDPOINTS.COPY_NOTES}/${id}`),

  // Download Excel export
  downloadExcel: () => 
    axiosInstance.get(NOTES_ENDPOINTS.DOWNLOAD_EXCEL_NOTES, { 
      responseType: 'blob' 
    }),
};

export const todoAPI = {

  getAllTodo: () => axiosInstance.get(TODO_ENDPOINTS.ALL_TODO),
  saveTodo: (todoData) => axiosInstance.post(TODO_ENDPOINTS.SAVE_TODO, todoData),
  getTodoById: (id) => axiosInstance.get(`${TODO_ENDPOINTS.GET_TODO_BY_ID}/${id}`),
  getTodoByStatus: (status) => axiosInstance.get(`${TODO_ENDPOINTS.GET_TODO_BY_STATUS}/${status}`),
  deleteTodo: (id) => axiosInstance.delete(`${TODO_ENDPOINTS.DELETE_TODO}/${id}`),
 changeStatus: (id, status) => {
    return axiosInstance.put(`${TODO_ENDPOINTS.CHANGE_STATUS}/${id}/status`, status, {
      headers: {
        'Content-Type': 'application/json', 
      }
    });
  }
  
}

export const userAPI = {
  changePassword: (passwordData) => axiosInstance.post(USER_ENDPOINTS.CHANGE_PASSWORD, passwordData),

    resetPasswordMail: (email) =>
  axiosInstance.get(USER_ENDPOINTS.RESET_PASSWORD_MAIL, {
    params: { email }
  }),
  verifyEmailResetLink: ({ uid, resetCode }) =>
      axiosInstance.get(USER_ENDPOINTS.VERIFY_EMAIL_RESET_LINK, {
        params: {
          uid,
          resetCode
        }
  }),

  resetPassword: (data) =>axiosInstance.post(USER_ENDPOINTS.RESET_PASSWORD, data),


  editUser: (userData) => axiosInstance.put(USER_ENDPOINTS.EDIT_USER, userData),

}


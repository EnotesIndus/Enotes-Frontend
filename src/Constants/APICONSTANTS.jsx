export const API_BASE_URL = import.meta.env.VITE_API_URL_BACK ;

export const API_BASE_URL_USER = import.meta.env.VITE_API_URL_BACK + 'user';
export const API_BASE_URL_AUTH = import.meta.env.VITE_API_URL_BACK + 'auth';
export const API_BASE_URL_CATEGORY = import.meta.env.VITE_API_URL_BACK + 'category';
export const API_BASE_URL_HOME = import.meta.env.VITE_API_URL_BACK + 'home';
export const API_BASE_URL_NOTES = import.meta.env.VITE_API_URL_BACK + 'notes';
export const API_BASE_URL_TODO = import.meta.env.VITE_API_URL_BACK + 'todo';



// users endpoints
export const ALL_USER_PROFILES = API_BASE_URL_USER + '/user-profiles';
export const CHANGE_PASSWORD = API_BASE_URL_USER + '/change-password';

// todos endpoints
export const TODO_ENDPOINTS = {
    ALL_TODO: API_BASE_URL_TODO + '/all',
    SAVE_TODO: API_BASE_URL_TODO + '/save-todo',
    GET_TODO_BY_ID: API_BASE_URL_TODO, //use /{id}
    GET_TODO_BY_STATUS: API_BASE_URL_TODO +'/by-status',
    DELETE_TODO: API_BASE_URL_TODO + '/delete', //use /{id}
    CHANGE_STATUS: API_BASE_URL_TODO  //'/{id}/status', //use /{id}
}

export const NOTES_ENDPOINTS = {
// notes endpoints
  ALL_NOTES: API_BASE_URL_NOTES + '/',
  USER_NOTES: API_BASE_URL_NOTES + '/user-notes',
  SEARCH_NOTES: API_BASE_URL_NOTES + '/search-notes',
  SAVE_NOTES: API_BASE_URL_NOTES + '/save-notes',
  DELETE_NOTES: API_BASE_URL_NOTES + '/delete', //use /{id}
  RESTORE_NOTES: API_BASE_URL_NOTES + '/restore', //use /{id}
  DOWNLOAD_NOTES: API_BASE_URL_NOTES + '/download', //use /{id}
  RECYCLE_NOTES: API_BASE_URL_NOTES + '/recycle', 
  RECYCLE_DELETE_NOTES: API_BASE_URL_NOTES + '/recycle/delete',   // use /{id};
  RECYCLE_ALL_DELETE_NOTES: API_BASE_URL_NOTES + '/recycle/deleteAll',   
  SAVE_FAV_NOTES: API_BASE_URL_NOTES + '/fav', // use /{notesId};   
  UNFAV_NOTES: API_BASE_URL_NOTES + '/unfav/', // use {favnotesId}'; 
  ALL_FAV_NOTES: API_BASE_URL_NOTES + '/favs', 
  COPY_NOTES: API_BASE_URL_NOTES + '/copy', // use /{id}'; 
  DOWNLOAD_EXCEL_NOTES: API_BASE_URL_NOTES + '/notes-excel',  

}


// home endpoints
export const VERIFY_EMAIL_USER = API_BASE_URL_HOME + '/verify';  
export const RESET_PASSWORD_MAIL = API_BASE_URL_HOME + '/reset-password-mail';  
export const VERIFY_EMAIL_RESET_LINK = API_BASE_URL_HOME + '/email-verify';  
export const RESET_PASSWORD = API_BASE_URL_HOME + '/reset-password';  


// Category endpoints
export const SAVE_CATEGORY = API_BASE_URL_CATEGORY + '/save-category';
export const ALL_CATEGORIES = API_BASE_URL_CATEGORY ;
export const ACTIVE_CATEGORIES = API_BASE_URL_CATEGORY + '/active';
export const CATEGORY_BY_ID = API_BASE_URL_CATEGORY ;  // use {id};
export const DELETE_CATEGORY = API_BASE_URL_CATEGORY ;  // use {id};


// auth endpoints
export const AUTH_ENDPOINTS = {
 REGISTER_USER : API_BASE_URL_AUTH + '/register',
 LOGIN_USER : API_BASE_URL_AUTH + '/login',
}






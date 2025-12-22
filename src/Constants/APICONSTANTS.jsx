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
export const ALL_TODO = API_BASE_URL_TODO + '/all';
export const SAVE_TODO = API_BASE_URL_TODO + '/save-todo';
export const GET_TODO_BY_ID = API_BASE_URL_TODO; //use /{id}
export const GET_TODO_BY_STATUS = API_BASE_URL_TODO +'/by-status';


// notes endpoints
export const ALL_NOTES = API_BASE_URL_NOTES + '/';
export const USER_NOTES = API_BASE_URL_NOTES + '/user-notes';
export const SEARCH_NOTES = API_BASE_URL_NOTES + '/search-notes';
export const SAVE_NOTES = API_BASE_URL_NOTES + '/save-notes';
export const DELETE_NOTES = API_BASE_URL_NOTES + '/delete'; //use /{id}
export const RESTORE_NOTES = API_BASE_URL_NOTES + '/restore'; //use /{id}
export const DOWNLOAD_NOTES = API_BASE_URL_NOTES + '/download'; //use /{id}
export const RECYCLE_NOTES = API_BASE_URL_NOTES + '/recycle'; 
export const RECYCLE_DELETE_NOTES = API_BASE_URL_NOTES + '/recycle/delete';   // use /{id};
export const RECYCLE_ALL_DELETE_NOTES = API_BASE_URL_NOTES + '/recycle/deleteAll';   
export const SAVE_FAV_NOTES = API_BASE_URL_NOTES + '/fav'; // use /{notesId};   
export const UNFAV_NOTES = API_BASE_URL_NOTES + '/unfav/'; // use {favnotesId}'; 
export const ALL_FAV_NOTES = API_BASE_URL_NOTES + '/favs'; 
export const COPY_NOTES = API_BASE_URL_NOTES + '/copy'; // use /{id}'; 
export const DOWNLOAD_EXCEL_NOTES = API_BASE_URL_NOTES + '/notes-excel';  



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
export const REGISTER_USER = API_BASE_URL_AUTH + '/register';
export const LOGIN_USER = API_BASE_URL_AUTH + '/login';







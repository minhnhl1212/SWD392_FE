// import { API_URL } from '../constrant/envConstrant';
// import cookieHelper from '../helpers/cookieHelper';
// import axios from 'axios';

// const { getCookie } = cookieHelper;

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Interceptor cho request
// api.interceptors.request.use(
//   async (config) => {
//     // Thêm token vào header Authorization nếu có
//     const token = getCookie('access-token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Xử lý lỗi request
//     return Promise.reject(error);
//   },
// );

// // Interceptor cho response
// api.interceptors.response.use(
//   (response) => {
//     // Trả về dữ liệu response
//     return response && response.data;
//   },
//   (error) => {
//     // Xử lý lỗi response
//     return Promise.reject(error);
//   },
// );

// // export const COURSE_HEADER_ID = 'lms-course-id';

// export default api;

// axiosConfig.js
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Cấu hình axios và axios-retry
axiosRetry(axios, {
  retries: 3, // Số lần thử lại
  retryDelay: (retryCount) => {
    return retryCount * 2000; // Thời gian chờ giữa các lần thử lại (mili giây)
  },
  retryCondition: (error) => {
    // Chỉ thử lại nếu request gặp lỗi 429 hoặc các lỗi 5xx
    return error.response?.status === 429 || error.response?.status >= 500;
  },
});

// Xuất axios đã cấu hình để tái sử dụng trong các file khác
export const axiosInstance = axios;

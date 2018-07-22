import axios from 'axios';

const axiosInstanceConfig = {
  timeout: 60000
};
const axiosInstance = axios.create(axiosInstanceConfig);

export default axiosInstance;

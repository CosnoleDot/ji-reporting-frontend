import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://apiv2.jamiatreporting.com/api/v1',
  headers: {
    'Content-Type': 'application/json', // Set default headers
    // Add other default headers if needed
  },
});

export default instance;

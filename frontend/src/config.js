//In development, apiUrl will be http://localhost:3000/api
//In production, apiUrl will be https://react-master-template-backend.onrender.com/api (because we'll have that set in Render)


let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:3000/api';
} else if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://react-master-template.onrender.com/api';
}
console.log('API URL:', apiUrl);  // This should output the correct API URL based on the environment

export default apiUrl;


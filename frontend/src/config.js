//In development, apiUrl will be http://localhost:3000/api
//In production, apiUrl will be https://react-master-template-backend.onrender.com/api (because we'll have that set in Render)


// let apiUrl = '';

// if (process.env.NODE_ENV === 'development') {
//   apiUrl = 'http://localhost:3000/api';
// } else if (process.env.NODE_ENV === 'production') {
//   // apiUrl = 'https://react-master-template.onrender.com/api';
//   apiUrl = 'https://react-auth-template.onrender.com';
// }


let apiUrl = '/api';

console.log('API URL:', apiUrl);  // This should output the correct API URL based on the environment
console.log('Current Environment:', process.env.NODE_ENV);  // This should output the current environment setting
export default apiUrl;


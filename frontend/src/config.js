//In development, apiUrl will be http://localhost:3000/api
//In production, apiUrl will be https://react-master-template-backend.onrender.com/api (because we'll have that set in Render)

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);  // This should output the correct API URL based on the environment
export default apiUrl;

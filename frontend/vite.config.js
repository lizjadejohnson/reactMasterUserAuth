import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import apiUrl from "./src/config"; // Import the API URL from your config file

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5000,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: 'dist' // Ensure this is set to 'dist'
    }
  };
});

//This Vite config is for local development.
//The proxy configuration in Vite is used to make API calls from the frontend development server (running on port 5000)
//to the backend server (running on port 3000).

// When you make a request to /api from your frontend, Vite will proxy this request to http://localhost:3000.
// The rewrite: (path) => path.replace(/^\/api/, '') part makes it so that the /api prefix is removed before the request is sent to http://localhost:3000.

//The frontend is served on http://localhost:5000.
// The backend is served on http://localhost:3000/api.
// The Vite proxy redirects all /api calls from the frontend to the backend,
//making the frontend *think* it's calling http://localhost:5000/api, while it's actually hitting http://localhost:3000.
//This is why we need CORS set up in the backend to allow both localhost 3000 and 5000.

//IMPORTANT: This set up allows us to have continual live development while developing in local host without needing to constantly rebuild the publicly served frontend
//In Render, the frontend is just served from the backend.
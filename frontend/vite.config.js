import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');
  console.log(`Running in ${mode} mode with VITE_API_URL: ${env.VITE_API_URL}`);


  return {
    plugins: [react()],
    define: {
      'process.env': {
        VITE_API_URL: env.VITE_API_URL
      }
    },
    server: {
      port: 5000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
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

//The proxy configuration in Vite is used to make API calls from the frontend development server (running on port 5000)
//to the backend server (running on port 3000).

// When you make a request to /api from your frontend, Vite will proxy this request to http://localhost:3000.
// The rewrite: (path) => path.replace(/^\/api/, '') part makes it so that the /api prefix is removed before the request is sent to http://localhost:3000.

//The frontend is served on http://localhost:5000.
// The backend is served on http://localhost:3000/api.
// The Vite proxy redirects all /api calls from the frontend to the backend,
//making the frontend *think* it's calling http://localhost:5000/api, while it's actually hitting http://localhost:3000.
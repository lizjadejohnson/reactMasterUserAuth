**Project Summary:**
This is a template for a simple notes application.
It has a complete frontend and backend which connects to a Mongo DB server.
It features user context support with JWT and Bcrypt.
This project is intended to be used as a template for projects requiring a setup frontend and backend with user support.
This is a MERN project. Ensure that you remember to npm install all dependencies on the front and backend.
<br />
**Info to get started:**
<br />
Backend: 3000
<br />
Frontend: 5000
<br />
Proxy (setup on the backend package.json): 3000
<br />
VISIT http://localhost:5000/
<br />
Ensure that you remember to install all dependencies for the root/frontend/backend. From the root directory run:
<br />
npm install && npm install --prefix frontend && npm install --prefix backend
<br />
npm run dev spins up the front and backend servers in local development.
<br />
**.env:**
<br />
Remember to create a new .env file in the backend directory!
<br />
It should look like:
<br />
PORT=3000
<br />
DB_URL=mongodb+srv://MONGOUSERNAME:YOURCLUSERPASSWORD.STRING.mongodb.net/DBNAME
<br />
JWT_SECRET=WHATEVERYOUWANTYOURSECRETKEYTOBE
<br />
You will also need to create a frontend .env file:
<br />
In the frontend folder, make a file called .env that contains:
<br />
VITE_API_URL=http://localhost:3000/api
<br />
Please note that when we set up Render, this will be different!
<br />


The current project is setup so that Concurrently runs the backend and frontend locally with npm run dev and if you have a Render setup you can run it in production. The Render site is not required to run locally following all previous instructions.
<br />

From here, you can follow the rest of the instructions to launch a Render app.
<br />

**RENDER INFO**
<br />
1. First, ensure you have followed all previous instructions to have Concurrently and have all the package.json's and everything else set up correctly.
2. Create / log in to a Render account: https://dashboard.render.com/
    <br />
3. Set up your backend project in Render:
    <br />
    a. Click the New + button.
    <br />
    b. Choose Web Service. This will be to build out our backend.
    <br />
    c. Build from a GitHub repository
    <br />
    d. Set region, leave branch as master, leave root directory **blank** (not backend, etc), leave runtime as Node, etc.  Do not name the project as what you would want your primary URL to be, name it something like example-app-backend. The URL is generated based on the name.
    <br />
    e. Change the "build command" to: npm install --prefix backend
    <br />
    f. Change the "start command" to: npm start --whiteboard=backend
    <br />
    g. Add the backend-only environment variables from the backend .env (it allows you to copy and paste for ease)
    <br />
    *Note: We do not need to add the local host env variable because it doesn't apply to our production site.
    <br />
4. Set up your frontend project in Render:
    <br />
    a. Click the New + button.
    <br />
    b. Choose static site. This will be to build out our frontend.
    <br />
    c. Build from a GitHub repository
    <br />
    d. Set region, leave branch as master, leave root directory **blank** (not frontend, etc), leave runtime as Node, etc. Name the project as what you would want your primary URL to be. The URL is generated based on the name.
    <br />
    e. Change the "build command" to: npm install --prefix frontend && npm run build --prefix frontend
    <br />
    f. Change the "publish directory" to: frontend/dist
    <br />
    g. Add the frontend .env but DO NOT USE the one you have set up locally. Enter a new one with the same key of VITE_API_URL but a value of whatever your backend URL is (e.g.: https://notes-app-backend.onrender.com/api). We do not need to add the local host env variable because it doesn't apply to our production site. Keep that only locally.
    <br />
    h. For just the frontend, you will need to go into the Redirects/Rewrite options in your Render Dashboard and enter a source of /* a destination of /index.html and an action of rewrite and save that.
    <br />
5. Add both of your FRONTEND Render page URLs to your CORS configuration in your backend's index.js (no backend URLS in CORS here):
    <br />
    app.use(cors({
    <br />
        origin: ['http://localhost:5000', 'https://the-url-to-your-frontend-site.com'],
    <br />
        credentials: true
    <br />
    }));
        <br />
4. Be sure to add your Render site to your Mongo whitelist - In Mongo:
    <br />
    a. Access Network Access Settings:
    <br />
    b. In the left-hand navigation, click on "Network Access" under the "Security" section.
    <br />
    c. Click the "Add IP Address" button.
    <br />
    d. Add each IP address provided by Render. You can access these in your Render project by selecting the "Connect" button in the upper right. It provided me with 3 different outbound IP addresses.
    <br />
    Again, in Render you will start with npm start and build with npm run build. Locally, you will start with npm run dev.
    <br />
At this point, you should have a fully functional frontend, backend, local development and production site using Render.
    <br />
Again, if you are working in development and want to be seeing all your changes in real time in your localhost, you will use the command:
    <br />
    npm run dev on localhost:5000
    <br />
If you clone this project and want to ensure all dependencies are set up, from root you'll run:
    <br />
npm install && npm install --prefix frontend && npm install --prefix backend
    <br />
Good luck!
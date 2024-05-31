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
npm run build
<br />
npm run dev spins up the front and backend servers in local development.
<br />
npm start and npm run build are used in Render/production.
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
You will also need to create 2 frontend env files:
<br />
In the frontend folder, make a file called .env that contains:
<br />
VITE_API_URL=http://localhost:3000
<br />
And add another file in the frontend called .env.production that contains:
<br />
VITE_API_URL=the-url-to-your-deployed-site.com
<br />

The current project is setup so that Concurrently runs the backend and frontend locally with npm run dev and if you have a Render setup you can run it in production with npm start and npm run build. The Render site is not required to run locally following all previous instructions.
<br />

From here, you can follow the rest of the instructions to launch a Render app.
<br />

**RENDER INFO**
<br />
1. First, ensure you have followed all previous instructions to have Concurrently and have all the package.json's set up correctly.
2. Create / log in to a Render account: https://dashboard.render.com/
    <br />
    a. Click the New + button.
    <br />
    b. Choose Web Service
    <br />
    c. Build from a GitHub repository
    <br />
    d. Set region, leave branch as master, leave root directory blank, leave runtime as Node, etc.
    <br />
    e. Change the "build command" to: npm run build
    <br />
    f. Change the "start command" to: npm start
    <br />
    g. Add the environment variables from the backend .env (it allows you to copy and paste for ease) as well as the new VITE_API_URL=the-url-to-your-deployed-site
    <br />
    *Note: We do not need to add the local host env variable because it doesn't apply to our production site.
    <br />
3. Add your Render page's URL to your CORS configuration in your backend's index.js:
    <br />
    app.use(cors({
    <br />
        origin: ['http://localhost:5000', 'https://the-url-to-your-deployed-site.com'],
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
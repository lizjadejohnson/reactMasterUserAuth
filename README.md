# **Project Summary:**
This is a template for a simple notes application.
It has a complete frontend and backend which connects to a Mongo DB server.
It features user context support with JWT and Bcrypt.
This project is intended to be used as a template for projects requiring a setup frontend and backend with user support.
This is a MERN project. Ensure that you remember to npm install all dependencies on the front and backend.
<br />
## **Info to get started:**
You can clone this project locally like so:
	`git clone https://github.com/lizjadejohnson/reactMasterUserAuth.git *YOURPROJECTNAME*`
	<br />
Ensure that you remember to install all dependencies for the root/frontend/backend. From the root directory run: `npm run install-all`
<br />
Thanks to Concurrently this will ensure all dependencies are up to date as well as build the frontend.
<br />
`npm run dev` will then spin up the front and backend servers in local development.
<br />
Backend: 3000
Frontend: 5000
(Proxy setup on the vite config)
VISIT http://localhost:5000/
<br />
## **.env:**
Remember to create a **new** .env file in the backend directory!
<br />
It should look like:
<br />
PORT=3000
<br />
DB_URL=*mongodb+srv://MONGOUSERNAME:YOURCLUSERPASSWORD.STRING.mongodb.net/DBNAME*
<br />
JWT_SECRET=*WHATEVERYOUWANTYOURSECRETKEYTOBE*
<br />
NODE_ENV=development
<br />
A frontend env file is not necessary with this set up. You will need to ensure you utilize the config.js file, however.
<br />


The current project is setup so that Concurrently runs the backend and frontend locally with npm run dev and if you have a Render setup you can run it in production. The Render site is not required to run locally following all previous instructions. IMPORTANT: This project assumes you have a parent directory for your project which houses a backend directory and a frontend directory within it.
<br />

From here, if you have followed all steps above, you should have a working local development app. You can choose to follow the rest of the instructions to launch a Render app.
<br />

## **RENDER INFO:**
1. First, ensure you have followed all previous instructions to have Concurrently and have all the package.json's, index.js and everything else set up correctly as done here.
    <br />
2. Create / log in to a Render account: https://dashboard.render.com/
    <br />
3. Set up your backend project in Render:
    <br />
	a. Click the New + button.
    <br />
  	b. Choose Web Service. This will be to build out our backend. Our backend will be serving the frontend. This will be 1 project in Render!
    <br />
	c. Build from a GitHub repository
    <br />
	d. Set region, leave branch as master, leave the root directory blank, leave most settings how they are, etc.  Name the project as what you would want your primary URL to be, the URL is generated based on the name.
    <br />
	e. Change the "build command" to: `cd frontend && npm install --include=dev && npm run build && cd ../backend && npm install --include=dev && cp -R ../frontend/dist ./public`
    <br />
    f. Change the "start command" to: `cd backend && npm start`
    <br />
    g. Add the backend-only environment variables from the backend .env (it allows you to copy and paste for ease). Add environment variables from the backend .env you have in your local file (it allows you to copy and paste for ease). These should be the DB_URL, the JWT_SECRET and the PORT.
    <br />
	*Note: We do not need to add the local host env variable because it doesn't apply to our production site.*
    <br />
	*IMPORTANT: Locally our NODE_ENV is set to development. Only in Render (not locally) you will want to add a key of NODE_ENV with a value of production.*
    <br />
    (So that is 4 total env settings for the back end on Render.)
    <br />
4. Add your Render page's URL to your CORS configuration in your backend's index.js:
    <br />
	`const allowedOrigins = isProduction ? ['https://react-auth-template.onrender.com'] : ['http://localhost:5000', 'http://localhost:3000'];`
    <br />
5. Add your Render page's URL to your front end URL configuration in frontend/src/confis.js:
    <br />
    if (process.env.NODE_ENV === 'development') {
    <br />
        apiUrl = 'http://localhost:3000/api';
    <br />
    } else if (process.env.NODE_ENV === 'production') {
    <br />
        apiUrl = 'https://RENDERURL.onrender.com/api';
    <br />
    }
    <br />
6. Be sure to add your Render site to your Mongo whitelist - In Mongo:
    <br />
	a. Access Network Access Settings:
    <br />
	b. In the left-hand navigation, click on "Network Access" under the "Security" section.
    <br />
	c. Click the "Add IP Address" button.
    <br />
	d. Add each IP address provided by Render. You can access these in your Render project by selecting the "Connect" button in the upper right. It provided me with 3 different outbound IP addresses.
    <br />
	Again, in Render you will use the build and start commands specified above. Locally, you will start with `npm run dev`.
    <br />

------------


At this point, you should have a fully functional frontend, backend, local development and production site using Render.
    <br />
Again, if you are working in development and want to be seeing all your changes in real time in your localhost, you will use the command:
    <br />
	`npm run dev` from the parent directory and visit localhost:5000
    <br />
If you clone this project and want to ensure all dependencies are set up, from root you'll need to remember to first run:
    <br />
	`npm run install-all`
    <br />
Good luck!
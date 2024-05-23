**Project Summary:**
This is a template for a simple notes application.
It has a complete frontend and backend which connects to a Mongo DB server.
It features user context support with JWT and Bcrypt.
This project is intended to be used as a template for projects requiring a setup frontend and backend with user support.
This is a MERN project. Ensure that you remember to npm install all dependencies on the front and backend.

**Server info:**
Backend: 3000
Frontend: 5000
Proxy (setup on the backend package.json): 3000
VISIT http://localhost:5000/

npm run dev spins up the front and backend servers.

**.env:**
Remember to create a new .env file in the backend directory!
It should look like:

PORT=3000
DB_URL=mongodb+srv://MONGOUSERNAME:YOURCLUSERPASSWORD.STRING.mongodb.net/DBNAME
JWT_SECRET=WHATEVERYOUWANTYOURSECRETKEYTOBE

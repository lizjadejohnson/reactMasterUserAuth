require("dotenv").config()  //Allows .env


const express = require("express")
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require("cors");

//Pulls Mongoose connection into main application
const connectToDb = require("./config/connectToDb")

const app = express()

const PORT = process.env.PORT || 3000;
//User port specified in env or 3000


// ---------Importing our Route documents--------------
const usersRoutes = require('./routes/usersRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');
const todosRoutes = require('./routes/todosRoutes.js');



/////////////////////////////////////////////////////////////////////////

// --------------Middlewares--------------
app.use(express.json()) //Express doesn't naturally convert our data to json
app.use(cookieParser());



/// CORS setup with logging for debugging:


// Adjusting CORS settings for development and production environments (in development we need both our backend and frontend servers!)
//This is because when developing live in localhost, we are using a proxy in vite config so we can see updates without having to rebuild the frontend all the time.
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction ? ['https://react-auth-template.onrender.com'] : ['http://localhost:5000', 'http://localhost:3000'];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true // Important: This enables cookies to be sent and received
};

// Use the cors middleware with options
app.use(cors(corsOptions));

// Additional security headers setup
app.use((req, res, next) => {
    // Setting headers that help secure your app
    const origin = allowedOrigins.includes(req.headers.origin) ? req.headers.origin : allowedOrigins[0];
    res.header('Access-Control-Allow-Origin', origin); // Reflect the origin or use a default
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


//This initializes our connectToDb function
connectToDb()



////////////////////////////////////////////////////////////////////////////////




//-----Objective: We want to establish CRUD routes for our Notes model-----
//Always use res.json as opposed to res.send when responding back to the client with json data
//These routes are defined in our controllers>xxxxxController.js file, notice how the methods are specified.
//Specific routes are defined in the routes/xxxRoutes.js docs

// ------------------------- USE OUR ROUTES -------------------------
app.use("/api/users", usersRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/todos", todosRoutes);



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// }
  
// -------------------------------- [Databse Connection]------------------------------
app.listen(PORT, () => {
    console.log(`Express server listening on port number ${PORT}`)
})
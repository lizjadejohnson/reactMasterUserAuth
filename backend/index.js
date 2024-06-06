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
const notesRoutes = require('./routes/notesRoutes.js');
const todosRoutes = require('./routes/todosRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');


/////////////////////////////////////////////////////////////////////////

// --------------Middlewares--------------
app.use(express.json()) //Express doesn't naturally convert our data to json
app.use(cookieParser());


/// CORS setup with logging for debugging:

//List all frontend domains (no backends):
const allowedOrigins = ['http://localhost:5000', 'https://react-master-template-rw3m.onrender.com', 'https://react-master-template.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Not allowed by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    preflightContinue: true
}));

app.use((req, res, next) => {
    console.log("CORS middleware hit:", req.headers.origin);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
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
app.use("/api/notes", notesRoutes);
app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);



// Serve static files and handle SPA routing only in development (because otherwise we handle this explicitly in Render):
if (process.env.NODE_ENV === 'development') {
  
    // Serve static files from the Vite build directory
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  
    // Fallback to index.html for SPA
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    });
  }
  
// -------------------------------- [Databse Connection]------------------------------
app.listen(PORT, () => {
    console.log(`Express server listening on port number ${PORT}`)
})
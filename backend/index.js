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

//List all frontend domains (no backends):
// const allowedOrigins = process.env.NODE_ENV === 'production' 
    // ? ['https://react-master-template-rw3m.onrender.com', 'https://react-master-template.onrender.com'] 
    // ? ['https://react-auth-template.onrender.com']
    // : ['http://localhost:5000', 'http://localhost:3000'];

// Adjusting CORS settings for development and production environments
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = isProduction ? ['https://react-auth-template.onrender.com'] : ['http://localhost:5000', 'http://localhost:3000'];



// app.use(cors({
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             console.log('Not allowed by CORS:', origin);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     optionsSuccessStatus: 200,
//     preflightContinue: true
// }));

// app.use((req, res, next) => {
//     console.log("CORS middleware hit:", req.headers.origin);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // Important: This enables cookies to be sent and received
}));

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



// Serve static files and handle SPA routing only in development (because otherwise we handle this explicitly in Render):
// if (process.env.NODE_ENV === 'development') {
  
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
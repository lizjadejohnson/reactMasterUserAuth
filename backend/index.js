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


// --------------Middlewares--------------
app.use(express.json()) //Express doesn't naturally convert our data to json
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000', // This refers to the frontend port, needed for credentials
    credentials: true
  }));


connectToDb()
//This initializes our connectToDb function
// ---------------------------------------------reQs
// ---------------------------------------------Routing

// Serve static files from the React app Dist build:
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Also serve static files from the public directory:
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

//When you access the localhost, serve the index.html file from the frontend:
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
})


//-----Objective: We want to establish CRUD routes for our Notes model-----
//Always use res.json as opposed to res.send when responding back to the client with json data
//These routes are defined in our controllers>xxxxxController.js file, notice how the methods are specified.
//Specific routes are defined in the routes/xxxRoutes.js docs

// ------------------------- USE OUR ROUTES -------------------------
app.use("/notes", notesRoutes);
app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);



// -------------------------------- [Databse Connection]------------------------------
app.listen(PORT, () => {
    console.log(`Express server listening on port number ${PORT}`)
})
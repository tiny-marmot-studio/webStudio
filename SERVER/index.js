const express = require("express");
const app = express();
const session = require("express-session");
const authenticationRouter = require('./Routes/AuthenticationRouter'); 
const modelInfoRouter = require('./Routes/ModelInfoRouter'); 
const bodyParser = require('body-parser');
const cors = require("cors");
const pool = require("./db");
const {sessionSync, sessionMatch, CustomSessionStore} = require('./services/session/SessionManagement');
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(express.json());
app.use(session({
    store: new CustomSessionStore(),
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 10000, // 10 seconds
        //secure: true,
        httpOnly: true, // Helps prevent XSS
        //sameSite: 'strict', // Helps prevent CSRF
    }
}));

app.use('/Authentication', authenticationRouter);
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use('/modelInfo',modelInfoRouter)
app.use(sessionSync);
app.use(sessionMatch);
app.use('/Test',(req, res)=>{console.log("test"); res.send("succeed")});


app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});
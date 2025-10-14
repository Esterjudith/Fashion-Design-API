const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./routes/index')
const connectDB = require('./DB/connection')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(
        session({
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: true,
        })
    )
    // Initialize Passport and restore authentication state, if any, from the session
    .use(passport.initialize())
    .use(passport.session()
    )
    // CORS configuration   
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods:['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }))
    // .use(cors({origin: '*'}))
    .use('/', require('./routes/index'));

// GitHub OAuth Setup
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the sessions
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Connect to the database and start the server
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Listen on port ${port}`);
})
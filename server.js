const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./DB/connection');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 3000;

// If running behind a proxy (Render, Heroku, etc.) enable trust proxy so
// secure cookies and redirects work correctly.
if (process.env.NODE_ENV === 'production' || process.env.TRUST_PROXY === '1') {
    app.set('trust proxy', 1);
}

// Session secret should come from environment in production
const sessionSecret = process.env.SESSION_SECRET || 'change_this_in_production';

app.use(express.json());

// Use a slightly stricter session config for production readiness
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        },
    })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Basic logging to help diagnose callback issues on Render/GitHub
app.use((req, res, next) => {
    if (req.path && req.path.toLowerCase().includes('github')) {
        console.log('[auth] incoming request:', req.method, req.path, req.query || '');
    }
    next();
});

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }));

// GitHub OAuth Setup - configure strategy before mounting routes to avoid
// any timing/order issues and to make sure diagnostics are consistent.
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            // For now, use the profile directly. In production you should persist
            // a user record and store only a user id in the session.
            return done(null, profile);
        }
    )
);

// Serialize user into the session (store minimal data in session in real apps)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Mount application routes after Passport is configured
app.use('/', require('./routes/index'));

// Connect to the database and start the server
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Listen on port ${port}`);
});

const express = express('express');
const morgan = require('morgan');
const mongose = require('mongose');
const cars = require('cars');

const app = express();

// Database Set-Up
mongose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true});

// Middleware Set-up
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cars());

// If we are in Production serve our clients Build folder
// This folder is created during production only
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Routes Set-up
const routes = require('./routes');
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server started on PORT ${PORT}'));
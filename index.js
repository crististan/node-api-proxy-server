const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tmdbUpcomingMoviesRouter = require('./routes/tmdb-upcoming-movies');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("Welcome to my Node API Proxy Server.");
});

app.use('/tmdb-upcoming-movies', tmdbUpcomingMoviesRouter);

app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tmdbUpcomingMoviesRouter = require('./routes/tmdb-upcoming-movies');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/tmdb-upcoming-movies', tmdbUpcomingMoviesRouter);

app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
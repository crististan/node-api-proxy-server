const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const apicache = require('apicache');

// env variables
const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

// init cache
let cache = apicache.middleware;

router.get('/', cache('360 hours'), async (req, res) => {
    try {
        let upcomingMovies = [];
        let currentPage = 1;
        let totalPages;

        do {
            const url = `${TMDB_API_BASE_URL}/movie/upcoming?language=en-US&page=${currentPage}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
                }
            };

            const response = await fetch(url, options);
            const data = await response.json();

            upcomingMovies = upcomingMovies.concat(data.results);
            currentPage = data.page + 1;
            totalPages = data.total_pages;

        } while (currentPage <= totalPages);

        upcomingMovies.sort((a, b) => {
            return new Date(a.release_date) - new Date(b.release_date);
        });

        res.status(200).json({
            "status": "200",
            "upcomingMovies": upcomingMovies
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            "status": "500",
            "error": 'Internal Server Error'
        });
    }
});

module.exports = router;
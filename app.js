const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

// Serve static files
app.use(express.static("public"));

// Endpoint to get weather data
app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }
    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: apiKey,
                query: city
            }
        });

        // Send the response data directly to the client
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Settings
const LOGIN_URL = 'https://login.bne.catholic.edu.au'; // Your school's login endpoint

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Display login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login POST request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Send login request to the school's portal
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
                // Add other required form fields as needed (e.g., CSRF tokens)
            }),
        });

        if (response.ok) {
            // If login successful, redirect to the student portal
            res.redirect('/student-portal.html');
        } else {
            // If login fails, send a failure message
            res.send('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error(error);
        res.send('Error during login.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

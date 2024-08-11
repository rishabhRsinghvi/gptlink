const express = require('express');
const app = express();
const port = 3000;

let emails = [];
let currentEmailIndex = 0;

app.use(express.json());

app.post('/addEmail', (req, res) => {
    const { email } = req.body;
    emails.push(email);
    res.json({ success: true });
});

app.post('/switchEmail', (req, res) => {
    if (emails.length === 0) {
        return res.json({ success: false });
    }
    currentEmailIndex = (currentEmailIndex + 1) % emails.length;
    res.json({ success: true, email: emails[currentEmailIndex] });
});

app.get('/getEmails', (req, res) => {
    res.json({ emails });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "/101344680_labtest2-comp3133/src/index.html"));
    res.sendFile(path.join(__dirname + "/101344680_labtest2-comp3133/src/index.html"));
});

app.listen(8080, () => console.log('Server started on port 8080'));
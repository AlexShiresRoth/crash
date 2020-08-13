require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API Is Running'));
app.use('/api/store', require('./routes/store'));
app.use('/api/email', require('./routes/email'));

const server = http.createServer(app);

const PORT = process.env.PORT || '5000';

server.listen(PORT, () => console.log('Server running on PORT:' + PORT));

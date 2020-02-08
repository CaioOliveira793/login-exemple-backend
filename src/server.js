require('dotenv').config({ path: `${__dirname}/../.env` });

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	return res.json({ message: 'working' });
});


app.listen(process.env.NODE_PORT);

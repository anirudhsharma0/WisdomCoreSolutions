import express from 'express';
const app = express();
app.get('/api/ping', (req, res) => res.send('pong'));
app.listen(5002, () => console.log('Diagnostic Server on 5002'));

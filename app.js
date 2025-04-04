import 'dotenv/config';
import express from "express";
import cookieParser from 'cookie-parser';
import scoreRoutes from './server/routes/score.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', scoreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));

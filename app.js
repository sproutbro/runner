import express from "express";

const app = express();
app.use(express.static('public'));
app.use(express.json());

const PORT = 3006;
app.listen(PORT, console.log(`http://localhost:${PORT}`));

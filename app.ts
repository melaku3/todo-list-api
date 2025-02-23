import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoint
app.get('/api', (_req, res) => {
    const message = 'Hello world! Welcome to the API. This API allows you to manage a to-do list with various endpoints to create, read, update, and delete tasks.';
    res.json({ message });
});

export default app;

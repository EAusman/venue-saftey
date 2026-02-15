import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import venueRoutes from './routes/venueRoutes.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local', override: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', venueRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

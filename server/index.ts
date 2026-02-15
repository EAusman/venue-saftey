import express from 'express';
import venueRoutes from './routes/venueRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', venueRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
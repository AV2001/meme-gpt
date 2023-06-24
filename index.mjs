import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const PORT = 8000;
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT} :)`));

import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const PORT = 8000;
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const app = express();
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/openai', (req, res) => {
    openai
        .createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',

                    // ELON MUSK VS MARK ZUCKERBERG FIGHT
                    content: `You are an extremely funny and are well-versed with memes. I will be asking you to provide a text for the meme in the following context. The context is that Elon Musk and Mark Zuckerberg have agreed to fight each other. Make sure that you reply within 70 characters.`,
                },
                {
                    role: 'user',
                    content:
                        'Generate simple text for a meme in the context I provided.',
                },
            ],
        })
        .then((response) => {
            res.json(response.data.choices[0].message);
        })
        .catch((error) => console.log(error));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT} :)`));

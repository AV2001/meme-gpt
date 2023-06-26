require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const response = await openai.createChatCompletion({
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
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data.choices[0].message.content),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to connect to OpenAI' }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
};

exports.handler = handler;

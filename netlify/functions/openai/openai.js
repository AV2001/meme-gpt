require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // Parse the request body to get the JSON object
    const requestBody = JSON.parse(event.body);

    const apiKey = requestBody.apiKey;

    const configuration = new Configuration({
        apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are an extremely funny and are well-versed with memes. I will be asking you to provide a text for the meme in the following context. The context is that Elon Musk has implemented rate limits on Twitter and let's see what Mark Zuckerberg has to say to this. Make sure that you reply within 70 characters.`,
                },
                {
                    role: 'user',
                    content:
                        'Generate simple text for a meme in the context I provided and make sure that you break the internet.',
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
        if (error.response && error.response.status === 401) {
            return {
                statusCode: 401,
                body: JSON.stringify({
                    error: 'You have provided an invalid API key.',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        }

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

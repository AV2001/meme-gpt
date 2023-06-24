import { useState } from 'react';

const MemeGenerator = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/openai`
            );
            const body = await response.json();
            const meme = body.content;
            setResult(meme);
            setLoading(false);
            setError('');
        } catch (error) {
            setError('Oops!');
        }
    };
};

export default MemeGenerator;

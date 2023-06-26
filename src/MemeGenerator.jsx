import { useState } from 'react';

const MemeGenerator = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getData = async () => {
        setLoading(true);
        let responseClone;
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/openai`
            );
            responseClone = response.clone();
            const body = await response.json();
            const meme = body;
            setResult(meme);
            setError('');
        } catch (error) {
            console.log('Error parsing JSON from response:', error);
            if (responseClone) {
                const bodyText = await responseClone.text();
                console.log(
                    'Received the following instead of valid JSON:',
                    bodyText
                );
            }
            setError('Oops!');
        } finally {
            setLoading(false);
        }
    };

    const renderResponse = () => {
        const randomNum = Math.trunc(Math.random() * 17) + 1;
        return (
            <div className="meme-container">
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    result && (
                        <>
                            <p className="meme-text">
                                {result.toUpperCase().replace(/["]/g, '')}
                            </p>
                            <img
                                className="meme-img"
                                src={`/images/elon_vs_mark(${randomNum}).jpg`}
                                alt="Elon Musk and Mark Zuckerberg"
                            />
                        </>
                    )
                )}
            </div>
        );
    };

    return (
        <>
            <button className="btn" onClick={getData}>
                {loading ? 'Generating...' : 'Generate Meme'}
            </button>
            {renderResponse()}
        </>
    );
};

export default MemeGenerator;

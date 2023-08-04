import { useState } from 'react';

const MemeGenerator = ({ apiKey }) => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}openai`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ apiKey: apiKey }),
                }
            );

            // Check if the status code is 401
            if (response.status === 401) {
                const errorData = await response.json();
                alert(errorData.error); // Alert the error message
                return; // Exit the function early
            }

            const body = await response.json();
            const meme = body;
            setResult(meme);
            setError('');
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const renderResponse = () => {
        const randomNum = Math.trunc(Math.random() * 17) + 1;
        return (
            <div className='meme-container'>
                {loading ? (
                    <div className='spinner'></div>
                ) : (
                    result && (
                        <>
                            <p className='meme-text'>
                                {result.toUpperCase().replace(/["]/g, '')}
                            </p>
                            <img
                                className='meme-img'
                                src={`/images/elon_vs_mark(${randomNum}).jpg`}
                                alt='Elon Musk and Mark Zuckerberg'
                            />
                        </>
                    )
                )}
            </div>
        );
    };

    return (
        <>
            <button className='btn' onClick={getData}>
                {loading ? 'Generating...' : 'Generate Meme'}
            </button>
            {renderResponse()}
        </>
    );
};

export default MemeGenerator;

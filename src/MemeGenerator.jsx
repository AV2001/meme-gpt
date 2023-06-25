import { useState } from 'react';

const MemeGenerator = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.BACKEND_URL}/openai`);
            const body = await response.json();
            const meme = body.content;
            setResult(meme);
            setLoading(false);
            setError('');
        } catch (error) {
            setLoading(false);
            setError('Oops!');
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

    console.log(result);

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

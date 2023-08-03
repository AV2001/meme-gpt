import './App.css';
import MemeGenerator from './MemeGenerator';
import { useState } from 'react';

const App = () => {
    const [apiKey, setApiKey] = useState('');

    return (
        <div className='App'>
            <div className='container'>
                <div className='content-box'>
                    <img
                        className='logo'
                        src='/images/meme-gpt-logo.png'
                        alt='Meme GPT logo'
                    />
                    <p>
                        Click the button below to generate a meme based on
                        what's trending.
                    </p>
                    <input
                        type='text'
                        placeholder='Enter your OpenAI API Key'
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <MemeGenerator apiKey={apiKey} />
            </div>
        </div>
    );
};

export default App;

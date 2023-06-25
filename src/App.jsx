import './App.css';
import MemeGenerator from './MemeGenerator';

const App = () => {
    return (
        <div className="App">
            <div className="container">
                <div className="content-box">
                    <img
                        className="logo"
                        src="/images/meme-gpt-logo.png"
                        alt="Meme GPT logo"
                    />
                    <p>
                        Click the button below to generate a meme based on
                        what's trending.
                    </p>
                </div>
                <MemeGenerator />
            </div>
        </div>
    );
};

export default App;

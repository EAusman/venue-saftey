import '../styles/Welcome.css';

interface WelcomeProps {
    onEnter: () => void;
}

export function Welcome({ onEnter }: WelcomeProps) {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome to Venue Safety</h1>
                <button className="welcome-button" onClick={onEnter}>
                    Enter
                </button>
            </div>
        </div>
    );
}

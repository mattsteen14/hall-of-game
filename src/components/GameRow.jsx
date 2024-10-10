import './GameRow.css';

export const GameRow = ({ children }) => {
    return (
        <div 
        className='game-row'>
            {children}
        </div>
    );
};
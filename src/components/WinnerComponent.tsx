import React, {FC} from 'react';

interface WinnerProps {
    winner: string,
    restart: () => void,
    handleWin: (winner: string | null) => void,
    setCurrentPlayer: (currentPlayer: null) => void,
}

const WinnerComponent: FC<WinnerProps> = ({winner, restart, handleWin, setCurrentPlayer}) => {

    const handleRestart = () => {
        setCurrentPlayer(null);
        handleWin(null);
        restart();
    }

    return (
        <div className='timer'>
            <h2>Time is over.</h2>
            <h2>Winner is: {winner} player</h2>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>
        </div>
    );
};

export default WinnerComponent;
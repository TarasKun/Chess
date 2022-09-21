import React, {FC, useState, useRef, useEffect} from 'react';
import {Colors} from "../Models/Colors";
import {Player} from "../Models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    handleWin: (winner: string) => void;
}

const TimerComponent: FC<TimerProps> = ({currentPlayer, restart, handleWin}) => {
    const [blackTimer, setBlackTimer] = useState(300);
    const [whiteTimer, setWhiteTimer] = useState(300);
    const [winner, setWinner] = useState<string | null>(null);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const gameOver = (player: string) => {
    }

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    useEffect(() => {
        if (blackTimer < 1) handleWin('White')
        if (whiteTimer < 1)  handleWin('Black')
    }, [whiteTimer, blackTimer]);

    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;

        timer.current = setInterval(callback, 1000)
    }

    const decrementWhiteTimer = () => {
        if (whiteTimer === 0) return;
        setWhiteTimer(prevTime => prevTime - 1);
    }

    const decrementBlackTimer = () => {
        if (whiteTimer === 0) return;
        setBlackTimer(prevTime => prevTime - 1);
    }

    const handleRestart = () => {
        setWhiteTimer(300);
        setBlackTimer(300);
        restart();
    }

    return (
        <div className='timer'>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>
            <h2>Black Time: {blackTimer}</h2>
            <h2>White Time: {whiteTimer}</h2>
        </div>
    );
};

export default TimerComponent;
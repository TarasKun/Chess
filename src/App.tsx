import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./Models/Board";
import {Player} from "./Models/Player";
import {Colors} from "./Models/Colors";
import LostFigures from "./components/LostFigures";
import TimerComponent from "./components/TimerComponent";
import WinnerComponent from "./components/WinnerComponent";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    useEffect(() => {
        winner && setCurrentPlayer(null);
    }, [ winner]);


    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer);
    }

    const handleWin = (winner: string | null) => {
        setWinner(winner);
    }

    const restart = () => {
        const newBoard = new Board();

        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        swapPlayer();
    }

    return (
        <div className="app">
            {winner
                ? <WinnerComponent
                    setCurrentPlayer={setCurrentPlayer}
                    handleWin={handleWin}
                    restart={restart}
                    winner={winner}/>
                : <TimerComponent
                    handleWin={handleWin}
                    currentPlayer={currentPlayer}
                    restart={restart}/>
            }
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}/>
            <div>
                <LostFigures title="Black Figures" figures={board.lostBlackFigures}/>
                <LostFigures title="White Figures" figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
}

export default App;

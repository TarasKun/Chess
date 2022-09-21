import React, {Fragment, FC, useState, useEffect} from 'react';
import {Board} from "../Models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../Models/Cell";
import {Player} from "../Models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            return;
        }

        if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
        }
    }

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();

        setBoard(newBoard);
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    return (
        <div>
            <h3 style={{visibility: currentPlayer ? "inherit" : 'hidden'}}>Current player: {currentPlayer?.color}</h3>
            <div className='board'>
                {board.cells.map((row, index) =>
                    <Fragment key={index.toString()}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>)
                        }
                    </Fragment>
                )}
            </div>
        </div>
    )
};

export default BoardComponent;
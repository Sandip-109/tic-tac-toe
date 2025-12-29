import "./App.css";
import Board from "./components/Board";
import HistoryList from "./components/HistoryList";
import { useState } from "react";
import { calculateWinner } from "./utils/helper";

export type Square = "X" | "O" | null;
export type Squares = Square[];
export type MovePosition = { x: number | null; y: number | null };
export type SquaresData = {
    squares: Squares;
    movePosition: MovePosition;
};
export type MovesHistory = SquaresData[];

function App() {
    const [history, setHistory] = useState<MovesHistory>([
        { squares: Array(9).fill(null), movePosition: { x: null, y: null } },
    ]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquaresData = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    const [isHistoryListReversed, setIsHistoryListReversed] = useState(false);
    const winnerInfo = calculateWinner(currentSquaresData.squares);

    let status: string;
    const winner = winnerInfo?.winner;
    const isDraw = !winner && currentSquaresData.squares.every(Boolean);
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw";
    } else {
        status = `Next Player: ${xIsNext ? "X" : "O"}`;
    }

    function handlePlay(nextSquaresData: SquaresData) {
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            nextSquaresData,
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function handleReverseOrderClick() {
        setIsHistoryListReversed((r) => !r);
    }

    return (
        <div className="game">
            <div className="game-board">
                <p>{status}</p>
                <Board
                    xIsNext={xIsNext}
                    onPlay={handlePlay}
                    squaresData={currentSquaresData}
                    winnerInfo={winnerInfo}
                />
            </div>
            <div className="game-history">
                <button onClick={handleReverseOrderClick}>
                    reverse list order
                </button>
                <HistoryList
                    jumpTo={jumpTo}
                    history={history}
                    currentMove={currentMove}
                    isListReversed={isHistoryListReversed}
                />
            </div>
        </div>
    );
}

export default App;

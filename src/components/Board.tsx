import Square from "./Square";
import type { IndiviualMoveArray } from "../App";
import { calculateWinner } from "../utils/helper";

type BoardProps = {
    xIsNext: boolean;
    squares: IndiviualMoveArray;
    onPlay: (nextSquares: IndiviualMoveArray) => void;
    winnerInfo: ReturnType<typeof calculateWinner>;
};

export default function Board({
    xIsNext,
    squares,
    onPlay,
    winnerInfo,
}: BoardProps) {
    function handleSquareClick(index: number) {
        if (squares[index] || winnerInfo?.winner) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }

        onPlay(nextSquares);
    }

    return (
        <>
            {[
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ].map((row) => (
                <div className="row">
                    {row.map((item) => (
                        <Square
                            value={squares[item]}
                            onSquareClick={() => handleSquareClick(item)}
                            isWinningSquare={
                                winnerInfo?.winningLine.includes(item) ?? false
                            }
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

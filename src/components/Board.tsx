import Square from "./Square";
import type { MovePosition, SquaresData } from "../App";
import { calculateWinner } from "../utils/helper";

type BoardProps = {
    xIsNext: boolean;
    squaresData: SquaresData;
    onPlay: (squares: SquaresData) => void;
    winnerInfo: ReturnType<typeof calculateWinner>;
};

export default function Board({
    xIsNext,
    squaresData,
    onPlay,
    winnerInfo,
}: BoardProps) {
    function handleSquareClick(index: number, movePosition: MovePosition) {
        if (squaresData.squares[index] || winnerInfo?.winner) {
            return;
        }

        const nextSquares = { squares: squaresData.squares.slice(), movePosition };
        if (xIsNext) {
            nextSquares.squares[index] = "X";
        } else {
            nextSquares.squares[index] = "O";
        }

        onPlay(nextSquares);
    }

    return (
        <>
            {[
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ].map((row, rowIndex) => (
                <div className="row">
                    {row.map((item, itemIndex) => (
                        <Square
                            value={squaresData.squares[item]}
                            onSquareClick={() =>
                                handleSquareClick(item, {
                                    x: rowIndex,
                                    y: itemIndex,
                                })
                            }
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

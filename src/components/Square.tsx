import type { Square } from "../App";

type SquareProps = {
    value: Square;
    onSquareClick: () => void;
    isWinningSquare: boolean;
};

export default function Square({
    value,
    onSquareClick,
    isWinningSquare,
}: SquareProps) {
    return (
        <button
            className={`square ${isWinningSquare ? "winning-square" : ""}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

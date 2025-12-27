import type { IndiviualMoveArray } from "../App";

type SquareProps = {
    value: IndiviualMoveArray[number];
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
            className={`square ${isWinningSquare ? "winner-square" : ""}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

import HistoryListItem from "./HistoryListItem";
import type { History } from "../App";

type HistoryListProps = {
    jumpTo: (nextMove: number) => void;
    history: History;
    currentMove: number;
    isListReversed: boolean;
};

export default function HistoryList({
    jumpTo,
    history,
    currentMove,
    isListReversed,
}: HistoryListProps) {
    function handleListItemClick(nextMove: number) {
        jumpTo(nextMove);
    }

    const listItems = history.map(({ movePosition: { x, y } }, index) => {
        const isActive = currentMove === index;

        const coordinates = `(${x}, ${y})`;
        let value: string;
        if (isActive) {
            value = `You are at move #${index}`;
        } else {
            value = index === 0 ? "Go to game start" : `Go to move ${index}`;
        }

        if (index > 0) value += ` ${coordinates}`;

        return (
            <HistoryListItem
                key={value}
                value={value}
                isActive={isActive}
                onListItemClick={() => handleListItemClick(index)}
            />
        );
    });

    if (isListReversed) {
        listItems.reverse();
    }

    return <ol reversed={isListReversed}>{listItems}</ol>;
}

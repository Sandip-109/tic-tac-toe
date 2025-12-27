type HistoryListItemProps = {
    isActive?: boolean;
    value: string;
    onListItemClick: () => void;
};

export default function HistoryListItem({
    value,
    isActive,
    onListItemClick,
}: HistoryListItemProps) {
    return (
        <li>
            {isActive ? (
                value
            ) : (
                <button onClick={onListItemClick}>{value}</button>
            )}
        </li>
    );
}

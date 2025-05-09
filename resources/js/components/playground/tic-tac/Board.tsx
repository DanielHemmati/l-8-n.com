import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import Square from './Square';

const useGameStore = create(
    combine(
        {
            history: [Array(9).fill(null)],
            currentMove: 0,
            xIsNext: true,
        },
        (set) => {
            return {
                setHistory: (nextHistory) => {
                    set((state) => ({
                        history: typeof nextHistory === 'function' ? nextHistory(state.history) : nextHistory,
                    }));
                },
                setXIsNext: (nextXIsNext) => {
                    set((state) => ({
                        xIsNext: typeof nextXIsNext === 'function' ? nextXIsNext(state.xIsNext) : nextXIsNext,
                    }));
                },
                setCurrentMove: (nextCurrentMove) => {
                    set((state) => ({
                        currentMove: typeof nextCurrentMove === 'function' ? nextCurrentMove(state.currentMove) : nextCurrentMove,
                    }));
                },
            };
        },
    ),
);

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateTruns(squares: string[]) {
    return squares.filter((square) => !square).length;
}

function calculateStatus(winner, turns, player) {
    if (!winner && !turns) return 'Draw';
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${player}`;
}

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
    // const xIsNext = useGameStore((state) => state.xIsNext);
    // const setXIsNext = useGameStore((state) => state.setXIsNext);
    // const squares = useGameStore((state) => state.squares);
    // const setSquares = useGameStore((state) => state.setSquares);
    const player = xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
    const turns = calculateTruns(squares);
    const status = calculateStatus(winner, turns, player);

    function handleClick(i: number) {
        if (squares[i] || winner) return;
        const nextSquares = squares.slice();
        nextSquares[i] = player;
        onPlay(nextSquares);
    }

    return (
        <>
            <div style={{ marginBottom: '0.5rem' }}>{status}</div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    width: 'calc(3 * 2.5rem)',
                    height: 'calc(3 * 2.5rem)',
                    border: '1px solid #999',
                }}
            >
                {squares.map((square, squareIndex) => (
                    <Square
                        key={squareIndex}
                        value={square}
                        onSquareClick={() => handleClick(squareIndex)}
                    />
                ))}
            </div>
        </>
    );
}

export default function Game() {
    const history = useGameStore((state) => state.history);
    const setHistory = useGameStore((state) => state.setHistory);
    const setXIsNext = useGameStore((state) => state.setXIsNext);
    const currentMove = useGameStore((state) => state.currentMove);
    const setCurrentMove = useGameStore((state) => state.setCurrentMove);
    const currentSquares = history[currentMove];
    // const xIsNext = useGameStore((state) => state.xIsNext);
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares) {
        const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        // setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // setXIsNext(nextMove % 2 === 0);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'monospace',
            }}
        >
            <h1>Tic Tac Toe</h1>
            <div>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>

            <div style={{ marginLeft: '1rem' }}>
                <ol>
                    {history.map((_, historyIndex) => {
                        const description = historyIndex > 0 ? `Go to move #${historyIndex}` : 'Go to move start';
                        return (
                            <li key={historyIndex}>
                                <button
                                    className="rounded-md border-2 border-gray-300 p-2"
                                    onClick={() => jumpTo(historyIndex)}
                                >
                                    {description}
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

import { useState } from 'react';
import type { GameState } from './types/types';
import { COLUMNS } from './utils/constants';
import { checkDraw, checkWinner, createBoard } from './utils/game';
import ArrowDown from './assets/arrow-down.svg';
import Input from './components/input';
import './App.css';

const randomizePlayerStart = () => {
  return Math.floor(Math.random() * 2 + 1);
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerTurn: randomizePlayerStart(),
    board: createBoard(),
    players:{ 
     1: { name: 'Player1', color: '#1790c9' },
     2: { name: 'Player2', color: '#f8f527' },
    },
    winner: false,
    draw: false
  })
  const [showArrow, setShowArrow] = useState<number>()

  const changePlayerTurn = () => {
    return gameState.playerTurn === 1 ? 2 : 1
  }


  const handleTurn = (colIndex: number) => {
    const newBoard = structuredClone(gameState.board)
    // find first cell in column that has value 0 (no player assigned to the cell)
    for (let row = newBoard.length - 1; row >= 0; row = row - 1 ) {
      const cell = newBoard[row][colIndex];
      if (cell === 0) {
          newBoard[row][colIndex] = gameState.playerTurn;
          const winner = checkWinner(newBoard, gameState.playerTurn)
          if (winner) {
            setGameState({ ...gameState, winner: true, board: newBoard })
            break;
          }
          if (row < 1) {
            const draw = checkDraw(newBoard)
            if (draw) {
              setGameState({ ...gameState, draw: true, board: newBoard })
            }
          }
          setGameState({ ...gameState, playerTurn: changePlayerTurn(),  board: newBoard, })
          break;
      }
    }
  }

  const checkColor = (cellValue: number) => {
    if (cellValue === 0) {
      return '#ffffff';
    };
    return gameState.players[cellValue].color;
  };

  const showHoveredColumn = (colIndex: number) => {
    setShowArrow(colIndex)
  }

    const updatePlayer = (e: React.ChangeEvent<HTMLInputElement>, playerNumber: number) => {
      setGameState(prevState => ({
        ...prevState,
        players: {
          ...prevState.players,
          [playerNumber]: {
            ...prevState.players[playerNumber],
            name: e.target.value,
          }
        }
      }));
    };

  return (
    <>
      <header className='app-header'>
        <Input 
          type="text" 
          name="player1"
          onChange={(e) => {updatePlayer(e, 1)}} 
          value={gameState.players[1].name}
        />
        <Input 
          type="text" 
          name="player2"
          onChange={(e) => {updatePlayer(e, 2)}} 
          value={gameState.players[2].name}
        />
      </header>
      <p>
        {gameState.winner ? `Vinnare är ${gameState.playerTurn}`: ''}
        {gameState.draw ? 'Det blev lika': ''}
      </p>
      <h3>{gameState.playerTurn === 1 ? gameState.players[1].name : gameState.players[2].name}s tur</h3>
      <div className='showArrow-wrapper'>
        {Array.from({ length: COLUMNS }, (_column, index) => {
          return (
            <span key={index} className='showArrow-column'>{showArrow === index ? <img src={ArrowDown} alt="arrow-down" /> : ''}</span>
          )
        })}
      </div>
      <section className='board-wrapper'>
        {gameState.board.map((rows: number[], rowIndex: number) => {
          return (
            <div className='board-row' key={'row'+ rowIndex}>
              {rows.map((cell: number, colIndex: number) => {
                return (
                  <button 
                    disabled={gameState.winner || gameState.draw}
                    onMouseOver={() => showHoveredColumn(colIndex)} 
                    className='board-button' 
                    key={`cell`+ rowIndex + colIndex} 
                    onClick={() => { handleTurn(colIndex) }} 
                    type='button'
                  >
                    <span className="board-marker" style={{ background: checkColor(cell)}} />
                  </button>
                )
              })}
            </div>
        )
        })}
      </section>
    </>
  )
}

export default App

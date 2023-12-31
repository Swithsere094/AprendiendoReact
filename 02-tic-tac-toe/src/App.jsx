import { useState } from 'react'
import 'canvas-confetti';
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

function App() {
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) 
  })
  
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage === "null" ? null : winnerFromStorage 
  }) //null es que no hay ganador, false es empate


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')
  }
  
  const updateBoard = (index) => {
    if(board[index] || winner) return; //No se actualiza el tablero si ya tiene algo o hay ganador

    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const NewTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(NewTurn)
    //guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', NewTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    window.localStorage.setItem('winner', newWinner)

    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false) //Empate
    }
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((square,index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                  {square}
                </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App

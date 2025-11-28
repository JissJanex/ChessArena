import {useState} from "react";
import {Chessboard} from 'react-chessboard';
import {game} from "./components/ChessLogic"

function App() {
  const [position, setPosition] = useState(game.fen());

  
  
  return (
    <div>  
      <Chessboard />
    </div>
  )
}

export default App

import { useState, useEffect } from "react";
import Game from "./components/Game";

function App() {
  // const [players, setPlayers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(true);
  const [leaderBoard, setLeaderBoard] = useState({
    highestScore: 0,
    rankings: [],
  });
  const [player, setPlayer] = useState();

  useEffect(() => {
    try {
      fetch("./player1.json")
        .then((response) => response.json())
        .then((data) => {
          setPlayer(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div>
        {console.log(player)}
        <button>LeaderBoard</button>
      </div>
      <Game
        player={player}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      />
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import Game from "./components/Game";
import { LeaderBoard } from "./components/LeaderBoard";

function App() {
  // const [players, setPlayers] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState({
    highestScore: 0,
    lowestScore: 0,
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

    const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    if (leaderBoard) {
      setLeaderBoard(leaderBoard);
    }
  }, []);

  const handleTopScore = (username, score = 0) => {
    if (username && score) {
      // let lowestScore =
      // leaderBoard?.lowestScore < score ? leaderBoard?.lowestScore : score;
      let rankings = [...leaderBoard.rankings, { username, score }].sort(
        (a, b) => b.score - a.score
      );
      let highestScore = Math.max(leaderBoard?.highestScore, score);

      let newLeaderBoard = {
        highestScore,
        // lowestScore,
        rankings,
      };

      setLeaderBoard(newLeaderBoard);

      localStorage.setItem("leaderBoard", JSON.stringify(newLeaderBoard));
    }
  };

  return (
    <>
      <div className="nav">
        {/* <button onClick={() => setShowLeaderBoard((prev) => !prev)}>
          Leader Board
        </button> */}
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <Game
          player={player}
          leaderBoard={leaderBoard}
          handleTopScore={handleTopScore}
        />
        <LeaderBoard rankings={leaderBoard?.rankings} />
      </div>
    </>
  );
}

export default App;

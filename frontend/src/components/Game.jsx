import { useState, useEffect } from "react";

import useTimer from "../hooks/useTimer";
import Modal from "./Modal";
import MovementButtons from "./MovementButtons";
import GameBoard from "./GameBoard";
import BoardHeader from "./BoardHeader";
import LeaderBoard from "./LeaderBoard";
import getRandomPosition from "../utils/getRandomPosition";
import getNewPosition from "../utils/getNewPosition";

const Game = () => {
  const [boardDetails, setBoardDetails] = useState({});
  const [isGameOver, setIsGameOver] = useState(true);
  const [leaderBoard, setLeaderBoard] = useState({
    highestScore: 0,
    lowestScore: 0,
    rankings: [],
  });
  const [player, setPlayer] = useState({
    name: "Player 1",
    robot: {
      skin: "Wall-E-icon.png",
      type: "robot",
      rotation: 180,
    },
  });
  const [reached, setReached] = useState(false);
  const [robot, setRobot] = useState({});
  const [robotPos, setRobotPos] = useState(null);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({});
  const [targetPos, setTargetPos] = useState(null);

  const board = boardDetails?.board;
  const boardSize = boardDetails?.width * boardDetails?.height;
  const highestScore = leaderBoard?.highestScore;

  const handleGameOver = () => {
    setRobotPos();
    setIsGameOver(true);
    handleTopScore(player?.name, score);
  };

  // Timer hook
  const { timeLeft, start, stopTime } = useTimer(handleGameOver);

  const handleTopScore = (username, score = 0) => {
    if (username && score) {
      let rankings = [...leaderBoard.rankings, { username, score }].sort(
        (a, b) => b.score - a.score
      );
      let highestScore = Math.max(leaderBoard?.highestScore, score);
      let newLeaderBoard = {
        highestScore,
        rankings,
      };
      setLeaderBoard(newLeaderBoard);
      localStorage.setItem("leaderBoard", JSON.stringify(newLeaderBoard));
    }
  };

  /**
   * handleDirection - add or subtract 90 degrees to the robots rotation
   * @param {*} rotate - direction of rotation
   *                      - LEFT  (90 degrees counter-clockwise)
   *                      - RIGHT (90 degrees clockwise)
   */
  const handleDirection = (rotate) => {
    let rotation = robot?.rotation;
    setReached(false);
    if (rotate === "LEFT") {
      rotation = rotation - 90;
    } else if (rotate === "RIGHT") {
      rotation = rotation + 90;
    }
    setRobot((prev) => ({ ...prev, rotation }));
  };

  /**
   * handleForward - moves the robot forward depending on the direction it is facing
   *               - the direction is determined by the robots current rotation,
   *                 the modulo of the robots current rotation from 360 degrees.
   *                 After the modulo if the rotation is less that 0 we add 360 degrees
   *               - 180 = NORTH, 0 = SOUTH, 270 = EAST, 90 = WEST
   *               - Deals with robot acquiring a target and if moving robot is out of bounds
   */
  const handleForward = () => {
    setReached(false);
    const boardWidth = boardDetails?.width;
    let newPosition = robotPos;
    let outOfBounds = false;
    let rotation = robot?.rotation % 360;
    if (rotation < 0) rotation = rotation + 360;

    [newPosition, outOfBounds] = getNewPosition(
      newPosition,
      rotation,
      boardSize,
      boardWidth
    );
    setRobotPos(newPosition);
    if (outOfBounds) {
      stopTime();
      handleGameOver();
      return;
    }
    if (newPosition === targetPos) {
      let newTargetPos = getRandomPosition(boardSize, [newPosition]);
      setReached(true);
      setScore((prev) => prev + 1);
      setTargetPos(newTargetPos);
    }
  };

  /**
   * handleNewGame - initializes a new game
   */
  const handleNewGame = () => {
    let robotPos = Math.floor(boardSize / 2);
    setRobotPos(robotPos);
    let targetPos = getRandomPosition(boardSize, [robotPos]);
    setTargetPos(targetPos);
    setIsGameOver(false);
    setReached(true);
    setScore(0);
    start(boardDetails?.timeLimit);
  };

  useEffect(() => {
    setTarget(boardDetails?.target);
    setRobot(player?.robot);
  }, [isGameOver]);

  /* Making mock network request for a future enpoint to get a custom game levels */
  // TODO: Create custom hook to get Levels
  // TODO: Create custom hook to get LeaderBoard
  useEffect(() => {
    try {
      fetch("./defaultLevel.json")
        .then((response) => response.json())
        .then((data) => {
          setBoardDetails(data);
        });
    } catch (error) {
      console.log(error);
    }
    const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
    if (leaderBoard) {
      setLeaderBoard(leaderBoard);
    }
  }, []);

  return (
    <div style={{ flex: "4", alignItems: "center" }}>
      <div className="container">
        <div className="board">
          <BoardHeader
            score={score}
            timeLeft={timeLeft}
            highestScore={highestScore}
          />

          {isGameOver && (
            <Modal
              playerName={player?.name}
              setPlayer={setPlayer}
              handleNewGame={handleNewGame}
            />
          )}

          <div style={{ width: `${100 * boardDetails?.width}px` }}>
            <GameBoard
              board={board}
              reached={reached}
              robot={robot}
              robotPos={robotPos}
              target={target}
              targetPos={targetPos}
            />
          </div>

          <MovementButtons
            handleDirection={handleDirection}
            handleForward={handleForward}
          />
        </div>
        <LeaderBoard rankings={leaderBoard?.rankings} />
      </div>
    </div>
  );
};
export default Game;

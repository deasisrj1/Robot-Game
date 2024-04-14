import { useState, useEffect } from "react";

import useTimer from "../hooks/useTimer";
import Modal from "./Modal";
import MovementButtons from "./MovementButtons";
import GameBoard from "./GameBoard";
import { BoardHeader } from "./BoardHeader";
import { LeaderBoard } from "./LeaderBoard";

const Game = ({ player, leaderBoard, handleTopScore }) => {
  const [isGameOver, setIsGameOver] = useState(true);
  const [boardDetails, setBoardDetails] = useState({});
  const [reached, setReached] = useState(false);
  const [robot, setRobot] = useState();
  const [robotPos, setRobotPos] = useState();
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState();
  const [targetPos, setTargetPos] = useState();
  const [userName, setUsername] = useState(player?.name);

  const board = boardDetails?.board;
  const boardSize = boardDetails?.width * boardDetails?.height;
  const highestScore = leaderBoard?.highestScore;

  const handleGameOver = () => {
    setRobotPos();
    setIsGameOver(true);
    handleTopScore(userName, score);
  };

  // Timer hook
  const { timeLeft, start, stopTime } = useTimer(handleGameOver);

  /**
   * getRandomPosition - creates a random number from 0 to the range upTo
   * excluding numbers that are in the array of numbers from without
   * @param {*} upTo - range of number we want to find
   * @param {*} without - numbers to exclude from random number generator
   * @returns
   */
  const getRandomPosition = (upTo, without = []) => {
    const numbers = Array(upTo)
      .fill()
      .map((_, index) => index)
      .filter((num) => !without.includes(num));
    return numbers[Math.floor(Math.random() * numbers.length)];
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

    switch (rotation) {
      case 180:
        if (newPosition - boardWidth < 0) {
          outOfBounds = true;
          break;
        }
        newPosition = robotPos - boardWidth;
        break;
      case 0:
        newPosition = robotPos + boardWidth;
        if (newPosition >= boardSize) {
          outOfBounds = true;
        }
        break;
      case 90:
        if ((newPosition % boardWidth) - 1 < 0) {
          outOfBounds = true;
          break;
        }
        newPosition = robotPos - 1;
        break;
      case 270:
        if (newPosition % boardWidth === boardWidth - 1) {
          outOfBounds = true;
          break;
        }
        newPosition = robotPos + 1;
        break;
    }
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
              playerName={userName}
              setUsername={setUsername}
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

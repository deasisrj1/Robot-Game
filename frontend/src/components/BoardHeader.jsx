export const BoardHeader = ({ score, timeLeft, highestScore }) => {
  return (
    <div className="board-header">
      <span>Score: {score}</span>
      <span>High Score: {score > highestScore ? score : highestScore}</span>
      <span>
        Time:{" "}
        {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? 0 : ""}${
          timeLeft % 60
        }`}
      </span>
    </div>
  );
};

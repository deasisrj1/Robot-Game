export const BoardHeader = ({ score, timeLeft }) => {
  return (
    <div className="board-header">
      <span>Score: {score}</span>
      <span>Highest Score:</span>
      <span>
        Time:{" "}
        {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? 0 : ""}${
          timeLeft % 60
        }`}
      </span>
    </div>
  );
};

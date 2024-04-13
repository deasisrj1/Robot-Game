const GameBoard = ({ board, robot, robotPos, target, targetPos, reached }) => {
  return (
    <div>
      {board?.map((tiles, i) => (
        <div className="square" key={i}>
          {i === robotPos ? (
            <img
              className="square-img"
              style={{
                transform: `rotate(${robot?.rotation}deg)`,
                transition: `${reached ? "" : "transform 1s"}`,
              }}
              src={`/${robot?.skin}`}
              alt={`${robot?.type}`}
            />
          ) : i === targetPos ? (
            <img
              className="square-img"
              src={`/${target?.skin}`}
              alt={`${target?.type}`}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};
export default GameBoard;

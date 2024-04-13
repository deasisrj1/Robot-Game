const MovementButtons = ({ handleDirection, handleForward }) => {
  return (
    <div style={{ marginTop: "5px" }}>
      <button
        //   disabled={isGameOver}
        className="move-buttons"
        onClick={() => handleDirection("LEFT")}
      >
        left
      </button>
      <button
        //   disabled={isGameOver}
        onClick={handleForward}
        className="move-buttons"
      >
        forward
      </button>
      <button
        //   disabled={isGameOver}
        onClick={() => handleDirection("RIGHT")}
        className="move-buttons"
      >
        right
      </button>
    </div>
  );
};
export default MovementButtons;

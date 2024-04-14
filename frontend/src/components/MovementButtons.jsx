const MovementButtons = ({ handleDirection, handleForward }) => {
  return (
    <div style={{ marginTop: "5px" }}>
      <button
        //   disabled={isGameOver}
        className="move-buttons"
        onClick={() => handleDirection("LEFT")}
      >
        ⟲
      </button>

      <button
        //   disabled={isGameOver}
        onClick={handleForward}
        className="move-buttons"
      >
        ↑
      </button>
      <button
        //   disabled={isGameOver}
        onClick={() => handleDirection("RIGHT")}
        className="move-buttons"
      >
        ⟳
      </button>
    </div>
  );
};
export default MovementButtons;

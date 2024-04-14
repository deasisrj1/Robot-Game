const MovementButtons = ({ handleDirection, handleForward }) => {
  return (
    <div style={{ marginTop: "5px" }}>
      <button className="move-buttons" onClick={() => handleDirection("LEFT")}>
        ⟲
      </button>

      <button onClick={handleForward} className="move-buttons">
        ↑
      </button>
      <button onClick={() => handleDirection("RIGHT")} className="move-buttons">
        ⟳
      </button>
    </div>
  );
};
export default MovementButtons;

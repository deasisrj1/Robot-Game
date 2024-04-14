const Modal = ({ playerName, handleNewGame, setPlayer }) => {
  const handleNameChange = (e) => {
    setPlayer((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <div>
      <div className="modal-background">
        <div className="modal centered">
          <h2>Enter your name:</h2>
          <div className="">
            <input
              name="username"
              defaultValue={playerName}
              onChange={(e) => handleNameChange(e)}
            ></input>
            <div>
              <button style={{ marginTop: "25px" }} onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;

const Modal = ({ playerName, handleNewGame, setUsername }) => {
  return (
    <div>
      <div className="modal-background">
        <div className="modal centered">
          <h2>Enter your name:</h2>
          <div className="">
            <input
              name="username"
              defaultValue={playerName}
              onChange={(e) => setUsername(e.target.value)}
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

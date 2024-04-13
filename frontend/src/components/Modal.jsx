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
              // value={playerName}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            {/* <h4>{playerName}</h4> */}
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

const Modal = ({ playerName, handleNewGame }) => {
  return (
    <div>
      <div className="modal-background">
        <div className="modal centered">
          <div className="">
            {playerName}
            <div>
              <button onClick={handleNewGame}>New Game</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;

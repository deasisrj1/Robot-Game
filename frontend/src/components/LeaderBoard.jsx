export const LeaderBoard = ({ rankings }) => {
  return (
    <div style={{ flex: "1" }}>
      <h1>Leader Board</h1>
      <div style={{ display: "flex" }}>
        <h2 style={{ flex: "1" }}>Name</h2>
        <h2 style={{ flex: "1" }}>Score</h2>
      </div>
      {rankings?.map((player, i) => (
        <div key={i} style={{ display: "flex" }}>
          <p style={{ flex: "1" }}> {player.username}</p>
          <p style={{ flex: "1" }}> {player.score}</p>
        </div>
      ))}
    </div>
  );
};

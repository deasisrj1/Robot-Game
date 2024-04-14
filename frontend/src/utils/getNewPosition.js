const getNewPosition = (newPosition, rotation, boardSize, boardWidth) => {
  let outOfBounds = false;
  switch (rotation) {
    case 180:
      if (newPosition - boardWidth < 0) {
        outOfBounds = true;
        break;
      }
      newPosition = newPosition - boardWidth;
      break;
    case 0:
      newPosition = newPosition + boardWidth;
      if (newPosition >= boardSize) {
        outOfBounds = true;
      }
      break;
    case 90:
      if ((newPosition % boardWidth) - 1 < 0) {
        outOfBounds = true;
        break;
      }
      newPosition = newPosition - 1;
      break;
    case 270:
      if (newPosition % boardWidth === boardWidth - 1) {
        outOfBounds = true;
        break;
      }
      newPosition = newPosition + 1;
      break;
  }

  return [newPosition, outOfBounds];
};

export default getNewPosition;

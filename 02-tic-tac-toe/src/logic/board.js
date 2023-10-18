import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Revisar las posiciones ganadoras en busqueda de un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && // --> X u O
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // --> X u O
    }
  }

  return null;
};

export const checkEndGame = (newBoard) => {
  //Revisar si se realizan todos lo posibles movimientos ( 9 )

  return newBoard.every((square) => square !== null);
};

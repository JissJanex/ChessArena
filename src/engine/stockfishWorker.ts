// Using the lite single-threaded version for better browser compatibility
const stockfish = new Worker("/stockfish/stockfish-17.1-lite-single-03e3232.js");
export default stockfish;
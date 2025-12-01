# ♟️ Chess Game

A modern, interactive chess game built with React, TypeScript, and Vite. Play chess locally with a friend in an elegant wooden-themed interface.

🎮 **[Play Now](https://chess-arena-steel.vercel.app/)**

## 🎮 Features

- **Player vs Player**: Play chess against a friend on the same device
- **Player vs Computer**: Challenge the Stockfish 17 chess engine
- **Move Validation**: Only legal moves allowed with visual highlighting
- **Captured Pieces**: Track pieces captured by each side
- **Game Detection**: Automatic check, checkmate, stalemate, and draw detection

## 🚀 Getting Started

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Copy Stockfish engine files**
   ```bash
   cp -r node_modules/stockfish/src public/stockfish
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** - Navigate to `http://localhost:5173`

## 🎯 How to Play

### Player vs Player
1. Click **"Player vs Player"** from the home page
2. **Click a piece** to select it and see legal moves highlighted
3. **Click a highlighted square** to move
4. **Click the same piece** to deselect
5. Use **Restart** button in header to start a new game

### Player vs Computer
1. Click **"Player vs Computer"** from the home page
2. You play as **White** and move first
3. The **Computer** plays as Black and responds automatically
4. The computer thinks for about 1 second before making each move
5. Use **Restart** button to start a new game against the computer

## 🛠️ Technology Stack

- React + TypeScript + Vite
- react-chessboard & chess.js
- react-router-dom
- Stockfish 17 (chess engine for computer opponent)

## 📝 License

See the LICENSE file for details.

---

**Enjoy your game! ♟️**

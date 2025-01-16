import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Tile from "./tile";

const createEmptyBoard = () => {
  return [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
};

const GameBoard = ({ setScore, setBestScore, resetGame, setResetGame }) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const scoreRef = useRef(0);
  const bestScoreRef = useRef(0);
  const [touchStart, setTouchStart] = useState(null);

  const addRandomTile = (board) => {
    const emptyTiles = [];
    const newBoard = [...board];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newBoard[i][j] === null) emptyTiles.push([i, j]);
      }
    }
    if (emptyTiles.length) {
      const [row, col] =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      newBoard[row][col] = Math.random() > 0.9 ? 4 : 2;
    }

    return newBoard;
  };

  const moveTiles = (direction) => {
    console.log(board);
    let newBoard = [...board];
    switch (direction) {
      case "up":
        for (let col = 0; col < 4; col++) {
          let column = [];
          for (let row = 0; row < 4; row++) {
            if (board[row][col] !== null) column.push(newBoard[row][col]);
          }
          column = mergeTiles(column);
          for (let row = 0; row < 4; row++) {
            newBoard[row][col] = column[row] || null;
          }
        }
        break;
      case "down":
        for (let col = 0; col < 4; col++) {
          let column = [];
          for (let row = 3; row >= 0; row--) {
            if (newBoard[row][col] !== null) column.push(newBoard[row][col]);
          }
          column = mergeTiles(column);
          for (let row = 3; row >= 0; row--) {
            newBoard[row][col] = column[3 - row] || null;
          }
        }
        break;
      case "left":
        for (let row = 0; row < 4; row++) {
          let rowArr = [];
          for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== null) rowArr.push(newBoard[row][col]);
          }
          rowArr = mergeTiles(rowArr);
          for (let col = 0; col < 4; col++) {
            newBoard[row][col] = rowArr[col] || null;
          }
        }
        break;
      case "right":
        for (let row = 0; row < 4; row++) {
          let rowArr = [];
          for (let col = 3; col >= 0; col--) {
            if (newBoard[row][col] !== null) rowArr.push(newBoard[row][col]);
          }
          rowArr = mergeTiles(rowArr);
          for (let col = 3; col >= 0; col--) {
            newBoard[row][col] = rowArr[3 - col] || null;
          }
        }
        break;
      default:
        break;
    }
    addRandomTile(newBoard);
    updateScore(newBoard);
    setBoard(newBoard);
  };

  const mergeTiles = (tiles) => {
    let merged = [];
    let temp = tiles.filter((tile) => tile !== null);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === temp[i + 1]) {
        temp[i] *= 2;
        scoreRef.current += temp[i];
        temp[i + 1] = null;
      }
    }

    merged = temp.filter((tile) => tile !== null);
    return merged.concat(Array(4 - merged.length).fill(null));
  };

  const updateScore = (newBoard) => {
    let score = 0;
    newBoard.forEach((row) => {
      row.forEach((tile) => {
        if (tile !== null) score += tile;
      });
    });
    scoreRef.current = score;
    setScore(score);
  };

  const checkGameOver = (board) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === null) return false;
        if (col < 3 && board[row][col] === board[row][col + 1]) return false;
        if (row < 3 && board[row][col] === board[row + 1][col]) return false;
      }
    }
    return true;
  };
  const checkGameWon = () => {
    if (scoreRef.current == 2048) return true;
  };
  let gameOver = checkGameOver(board) || checkGameWon();

  useEffect(() => {
    if (gameOver) {
      alert("Game Over!");
      if (scoreRef.current > bestScoreRef.current) {
        bestScoreRef.current = scoreRef.current;
        setBestScore(bestScoreRef.current);
      }
      let newBoard = [...createEmptyBoard()];
      addRandomTile(newBoard);
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(0);
    }
  }, [gameOver]);

  useEffect(() => {
    let newBoard = [...board];
    addRandomTile(board);
    addRandomTile(board);
    setBoard(newBoard);
  }, []);

  const handleKeyDown = (event) => {
    if (gameOver) return;
    switch (event.key) {
      case "ArrowUp":
        moveTiles("up");
        break;
      case "ArrowDown":
        moveTiles("down");
        break;
      case "ArrowLeft":
        moveTiles("left");
        break;
      case "ArrowRight":
        moveTiles("right");
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        moveTiles("right");
      } else {
        moveTiles("left");
      }
    } else {
      if (dy > 0) {
        moveTiles("down");
      } else {
        moveTiles("up");
      }
    }

    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    const boardElement = document.getElementById("game-board");
    boardElement.addEventListener("touchstart", handleTouchStart);
    boardElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      boardElement.removeEventListener("touchstart", handleTouchStart);
      boardElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameOver, resetGame, touchStart]);

  useEffect(() => {
    if (resetGame) {
      let newBoard = [...createEmptyBoard()];
      addRandomTile(newBoard);
      addRandomTile(newBoard);
      setBoard(newBoard);
      setResetGame(false);
      setScore(0);
    }
  }, [resetGame]);

  return (
    <Box
      id="game-board"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap={1}
      bgcolor="#bbada0"
      padding="15px"
      borderRadius="20px"
    >
      {board?.flat().map((tile, index) => (
        <Tile key={index} value={tile} />
      ))}
    </Box>
  );
};

export default GameBoard;

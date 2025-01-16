import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Header from "./components/header";
import GameBoard from "./components/gameBoard";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [resetGame, setResetGame] = useState(false);

  const handleRestart = () => {
    setResetGame(true);
  };

  return (
    <Stack>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="97vh"
        bgcolor="#faf8ef"
      >
        <Header score={score} bestScore={bestScore} onRestart={handleRestart} />
        <Container maxWidth="sm">
          <GameBoard
            setScore={setScore}
            setBestScore={setBestScore}
            resetGame={resetGame}
            setResetGame={setResetGame}
          />
        </Container>
      </Box>
    </Stack>
  );
}

export default App;

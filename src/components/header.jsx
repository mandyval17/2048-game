import React from "react";
import { Box, Typography, Button } from "@mui/material";
import '@fontsource/roboto';
const Header = ({ score, bestScore, onRestart }) => {
  return (
    <Box
      display="flex"
      flexDirection="space-around"
      justifyContent={"space-between"}
      alignItems="start"
      width="100%"
      marginBottom="16px"
    >
      <Typography
        variant="h2"
        sx={{
          color: "#776e65",
          fontSize: "60px",
          marginBottom: "8px",
          fontFamily:"Roboto",
          fontWeight:"bold",
        }}
      >
        2048
      </Typography>
      <Box display="flex" gap={2}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="80px"
          height="60px"
          bgcolor="#eae7d9"
          borderRadius="16px"
          
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#988876", fontSize: "15px", fontFamily:"Roboto" , fontWeight: "bold" }}
          >
            SCORE
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#988876", fontWeight: "bold", fontSize: "18px" , fontFamily:"Roboto" , fontWeight: "bold" }}
          >
            {score}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="80px"
          height="60px"
          bgcolor="#FAF8F0"
          borderRadius="16px"
          border={"2px solid #eae7d9"}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#988876", fontSize: "12px" }}
          >
            BEST
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#988876", fontWeight: "bold", fontSize: "18px" }}
          >
            {bestScore}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={onRestart}
        sx={{
          bgcolor: "#8f7a66",
          color: "#fff",
          padding: "8px 16px",
          fontWeight: "bold",
          fontSize: "14px",
          borderRadius: "4px",
          "&:hover": { bgcolor: "#776e65" },
        }}
      >
        New Game
      </Button>
      {/* </Box> */}
    </Box>
  );
};

export default Header;

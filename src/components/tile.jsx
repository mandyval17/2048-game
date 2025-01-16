import React from "react";
import { Box, Fade } from "@mui/material";

const getTileStyle = (value) => {
  const colors = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };

  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110px",
    width: "120px",
    fontSize: "50px",
    fontWeight: "bold",
    color: value > 4 ? "#f9f6f2" : "#776e65",
    backgroundColor: value ? colors[value] || "#3c3a32" : "#cdc1b4",
    borderRadius: "15px",
    fontFamily: "Roboto",
    boxShadow: value
      ? "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)"
      : "none",
  };
};

const Tile = ({ value }) => {
  return (
    <Box style={getTileStyle(value)}>
      <Fade in={!!value} timeout={300}>
        <Box>{value}</Box>
      </Fade>
    </Box>
  );
};

export default Tile;

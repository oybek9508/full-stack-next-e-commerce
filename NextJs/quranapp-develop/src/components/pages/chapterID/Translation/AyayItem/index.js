import { Box, Grid } from "@mui/material";
import React from "react";

const AyahItem = ({ chapter }) => {
  console.log("chapter", chapter);
  return (
    <div>
      {/* ayah player */}
      {/* ayah translated */}
      {/* ayah arabic  */}
      <Grid>
        <Box>{chapter.text}</Box>
        <Box>original</Box>
      </Grid>
    </div>
  );
};

export default AyahItem;

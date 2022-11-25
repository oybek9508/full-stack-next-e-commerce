import { Box, CardMedia, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ChapterItem = ({ chapter }) => {
  const router = useRouter();
  return (
    <Box onClick={() => router.push(`${chapter.id}`)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          borderBottom: "1px solid rgba(187, 196, 206, 0.35)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              alt="surah-order"
              src="/assets/icons/ayahNum.png"
              sx={{ width: "36px", height: "36px" }}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "7px",
                left: chapter.id < 10 ? 15 : chapter.id > 99 ? "7px" : "11px",
                fontSize: "14px",
                color: "#240F4F",
                fontFamily: "Poppins",
              }}
            >
              {chapter.id}
            </Typography>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#240F4F",
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              {chapter.name_simple}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "#8789A3",
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <Typography>{chapter.revelation_place}</Typography>
              <Typography>-</Typography>
              <Typography>{chapter.verses_count} Verses</Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#863ED5",
            fontFamily: "Poppins",
            fontWeight: 700,
          }}
        >
          {chapter.name_arabic}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChapterItem;

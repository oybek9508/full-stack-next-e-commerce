import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChapterItem from "./ChapterItem";
import { useQuranChapters } from "/src/api/quran-chapter-api";

const ChapterList = () => {
  const [chapters, setChapters] = useState({});
  const { data, error } = useQuranChapters();
  useEffect(() => {
    if (!chapters) return;
    setChapters(data);
  }, [chapters, data]);

  console.log("data", data);
  console.log("chapters", chapters);
  return (
    <Box sx={{ pb: "56px" }}>
      {data?.chapters.map((chapter) => {
        return <ChapterItem key={chapter.id} chapter={chapter} />;
      })}
    </Box>
  );
};

export default ChapterList;

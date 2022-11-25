import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import { useSingleSurah } from "/src/api/quran-chapter-api";
import Header from "/src/components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { useUthmaniScript, useUthmaniTajweedScript } from "/src/api/quran-api";
import { useSingleChapterTranslation } from "src/api/quran-translation";
import { useChaperAudioForEachAyah } from "/src/api/quran-audio-api";
import Order from "/src/components/ayah/Order";
import SingleAyahPlayer from "/src/components/audio/SingleAyahPlayer";
import ReadingPreferenceTab from "src/components/pages/chapterID/ReadingPreferenceTab";
import { PanoramaHorizontal } from "@mui/icons-material";

const SurahDetail = () => {
  const router = useRouter();
  const { chapterId } = router.query;
  const [singleSurah, setSingleSurah] = useState({});
  const [currentVerse, setCurrentVerse] = useState([]);
  const { data, error, isLoading } = useSingleSurah(chapterId);
  const { data: uthmaniScripts } = useUthmaniScript({
    chapter_number: chapterId,
  });
  const { data: singleChapterTranslation } = useSingleChapterTranslation({
    lang: 55,
    chapter_number: chapterId,
  });

  const { data: uthmaniTajweedScripts } = useUthmaniTajweedScript();
  const { data: audioData } = useChaperAudioForEachAyah(6, 2);

  // console.log("audioData", audioData);

  // const currVerse = uthmaniScripts?.verses.filter((verse) => {
  //   return (
  //     verse?.verse_key.substr(0, verse?.verse_key.indexOf(":")) ===
  //     router.query.id
  //   );
  // });

  //   const currAyah = audioData?.audio_files.filter((audio) => {
  //     return (
  //       audio?.verse_key.substr(0, audio?.verse_key.indexOf(":")) ===
  //       router.query.id
  //     );
  //   });

  //   console.log("currAyah", currAyah);

  useEffect(() => {
    if (!data) return;
    setSingleSurah(data);
  }, [data]);

  return (
    <Grid>
      <Header type="back" />
      <Grid sx={{ px: 3, mt: 4 }}>
        <ReadingPreferenceTab
          singleSurah={singleSurah}
          uthmaniScripts={uthmaniScripts}
          singleChapterTranslation={singleChapterTranslation}
        />
      </Grid>
    </Grid>
  );
};

export default SurahDetail;
